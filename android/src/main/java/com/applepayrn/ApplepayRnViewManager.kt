package com.applepayrn

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.NativeApplePayViewManagerInterface
import com.facebook.react.viewmanagers.NativeApplePayViewManagerDelegate

@ReactModule(name = ApplepayRnViewManager.NAME)
class ApplepayRnViewManager : SimpleViewManager<ApplepayRnView>(),
  NativeApplePayViewManagerInterface<ApplepayRnView> {
  private val mDelegate: ViewManagerDelegate<ApplepayRnView>

  init {
    mDelegate = NativeApplePayViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<ApplepayRnView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): ApplepayRnView {
    return ApplepayRnView(context)
  }

  @ReactProp(name = "configuration")
  override fun setConfiguration(view: ApplepayRnView?, value: String?) {
    // Apple Pay is iOS-only; no-op on Android
  }

  companion object {
    const val NAME = "NativeApplePayView"
  }
}
