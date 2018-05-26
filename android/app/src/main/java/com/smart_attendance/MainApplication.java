package com.smart_attendance;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.mackentoch.beaconsandroid.BeaconsAndroidPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNBackgroundFetchPackage(),
            new BackgroundTaskPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new BeaconsAndroidPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}