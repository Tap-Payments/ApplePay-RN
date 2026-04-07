package com.applepayrn

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.ApplepayRnViewManagerInterface
import com.facebook.react.viewmanagers.ApplepayRnViewManagerDelegate

@ReactModule(name = ApplepayRnViewManager.NAME)
class ApplepayRnViewManager : SimpleViewManager<ApplepayRnView>(),
  ApplepayRnViewManagerInterface<ApplepayRnView> {
  private val mDelegate: ViewManagerDelegate<ApplepayRnView>

  init {
    mDelegate = ApplepayRnViewManagerDelegate(this)
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

  @ReactProp(name = "color")
  override fun setColor(view: ApplepayRnView?, color: Int?) {
    view?.setBackgroundColor(color ?: Color.TRANSPARENT)
  }

  companion object {
    const val NAME = "ApplepayRnView"
  }
}
