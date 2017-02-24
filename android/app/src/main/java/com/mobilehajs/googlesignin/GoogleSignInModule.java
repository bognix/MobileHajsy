package com.mobilehajs.googlesignin;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInResult;
import com.google.android.gms.auth.api.signin.GoogleSignInStatusCodes;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Scope;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GetTokenResult;
import com.google.firebase.auth.GoogleAuthProvider;

import java.util.HashMap;
import java.util.Map;


public class GoogleSignInModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private GoogleApiClient _apiClient;

    public static final int RC_SIGN_IN = 9001;
    private FirebaseAuth mAuth;
    private FirebaseAuth.AuthStateListener mAuthListener;

    public GoogleSignInModule(final ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public void onNewIntent(Intent intent) {}

    @Override
    public void onActivityResult(Activity activity, final int requestCode, final int resultCode, final Intent intent) {
        if (requestCode == GoogleSignInModule.RC_SIGN_IN) {
            GoogleSignInResult result = Auth.GoogleSignInApi.getSignInResultFromIntent(intent);
            handleSignInResult(result, false);
        }
    }

    @Override
    public String getName() {
        return "GoogleSignIn";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("BUTTON_SIZE_ICON", SignInButton.SIZE_ICON_ONLY);
        constants.put("BUTTON_SIZE_STANDARD", SignInButton.SIZE_STANDARD);
        constants.put("BUTTON_SIZE_WIDE", SignInButton.SIZE_WIDE);
        constants.put("BUTTON_COLOR_AUTO", SignInButton.COLOR_AUTO);
        constants.put("BUTTON_COLOR_LIGHT", SignInButton.COLOR_LIGHT);
        constants.put("BUTTON_COLOR_DARK", SignInButton.COLOR_DARK);
        return constants;
    }

    @ReactMethod
    public void playServicesAvailable(boolean autoresolve, Promise promise) {
        final Activity activity = getCurrentActivity();

        if (activity == null) {
            promise.reject("NO_ACTIVITY", "no activity");
            return;
        }

        GoogleApiAvailability googleApiAvailability = GoogleApiAvailability.getInstance();
        int status = googleApiAvailability.isGooglePlayServicesAvailable(activity);

        if(status != ConnectionResult.SUCCESS) {
            promise.reject("" + status, "Play services not available");
            if(autoresolve && googleApiAvailability.isUserResolvableError(status)) {
                googleApiAvailability.getErrorDialog(activity, status, 2404).show();
            }
        }
        else {
            promise.resolve(true);
        }
    }

    @ReactMethod
    public void configure(final ReadableArray scopes, final String webClientId, final Boolean offlineAccess, final Promise promise) {
        final Activity activity = getCurrentActivity();

        if (activity == null) {
            promise.reject("NO_ACTIVITY", "NO_ACTIVITY");
            return;
        }

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                _apiClient = new GoogleApiClient.Builder(activity.getBaseContext())
                        .addApi(Auth.GOOGLE_SIGN_IN_API, getSignInOptions(scopes, webClientId, offlineAccess))
                        .build();
                _apiClient.connect();

                mAuth = FirebaseAuth.getInstance();

                mAuthListener = new FirebaseAuth.AuthStateListener() {
                    @Override
                    public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                        FirebaseUser user = firebaseAuth.getCurrentUser();
                        WritableMap params = Arguments.createMap();

                        if (user != null) {
                            Uri photoUrl = user.getPhotoUrl();

                            params.putString("id", user.getUid());
                            params.putString("name", user.getDisplayName());
                            params.putString("email", user.getEmail());
                            params.putString("photo", photoUrl != null ? photoUrl.toString() : null);

                            getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                    .emit("GoogleSignInSuccess" , params);
                        } else {
                            Log.d(getClass().getName(), "USER IS NOT SET");
                        }
                    }
                };

                mAuth.addAuthStateListener(mAuthListener);
                promise.resolve(true);
            }
        });
    }

    @ReactMethod
    public void signIn() {
        if (_apiClient == null) {
            emitError("GoogleSignInError", -1, "GoogleSignIn is undefined - call configure first");
            return;
        }

        final Activity activity = getCurrentActivity();

        if (activity == null) {
            emitError("GoogleSignInSilentError", -1, "No activity");
            return;
        }

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Intent signInIntent = Auth.GoogleSignInApi.getSignInIntent(_apiClient);
                activity.startActivityForResult(signInIntent, RC_SIGN_IN);
            }
        });
    }

    @ReactMethod
    public void signOut() {
        if (_apiClient == null) {
            emitError("GoogleSignOutError", -1, "GoogleSignIn is undefined - call configure first");
            return;
        }

        Auth.GoogleSignInApi.signOut(_apiClient).setResultCallback(new ResultCallback<Status>() {
            @Override
            public void onResult(Status status) {
                if (status.isSuccess()) {
                    getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("GoogleSignOutSuccess", null);
                } else {
                    int code = status.getStatusCode();
                    String error = GoogleSignInStatusCodes.getStatusCodeString(code);
                    emitError("GoogleSignOutError", code, error);
                }
            }
        });
    }

    @ReactMethod
    public void getAccessToken(final Promise promise) {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        user.getToken(true).addOnSuccessListener(new OnSuccessListener<GetTokenResult>() {
            @Override
            public void onSuccess(GetTokenResult getTokenResult) {
                promise.resolve(getTokenResult.getToken());
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                promise.reject("GET_ACCESS_TOKEN", e.getMessage());
            }
        });
    }

    private void emitError(String eventName, int code, String error) {
        WritableMap params = Arguments.createMap();
        params.putInt("code", code);
        params.putString("error", error);
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private GoogleSignInOptions getSignInOptions(final ReadableArray scopes, final String webClientId, final Boolean offlineAcess) {

        int size = scopes.size();
        Scope[] _scopes = new Scope[size];

        if(size > 0){
            for(int i = 0; i < size; i++){
                if(scopes.getType(i).name() == "String"){
                    String scope = scopes.getString(i);
                    if (scope != "email"){ // will be added by default
                        _scopes[i] = new Scope(scope);
                    }
                }
            }
        }

        if (webClientId != null && !webClientId.isEmpty()) {
            if (!offlineAcess) {
                return new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                        .requestIdToken(webClientId)
                        .requestScopes(new Scope("email"), _scopes)
                        .build();
            }
            else {
                return new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                        .requestServerAuthCode(webClientId, false)
                        .requestScopes(new Scope("email"), _scopes)
                        .build();
            }
        }
        else {
            return new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                    .requestScopes(new Scope("email"), _scopes)
                    .build();
        }

    }

    private void handleSignInResult(GoogleSignInResult result, Boolean isSilent) {
        WritableMap params = Arguments.createMap();

        if (result.isSuccess()) {
            GoogleSignInAccount acct = result.getSignInAccount();
            AuthCredential credential = GoogleAuthProvider.getCredential(acct.getIdToken(), null);

            mAuth.signInWithCredential(credential)
                    .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            if (!task.isSuccessful()) {
                                Log.w(getClass().getName(), "signInWithCredential", task.getException());
                            }
                        }
                    });

        } else {
            int code = result.getStatus().getStatusCode();
            String error = GoogleSignInStatusCodes.getStatusCodeString(code);

            params.putInt("code", code);
            params.putString("error", error);

            getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(isSilent ? "GoogleSignInSilentError" : "GoogleSignInError", params);
        }
    }
}