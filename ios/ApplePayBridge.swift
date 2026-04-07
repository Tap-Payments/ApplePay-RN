import ApplePay_iOS
import UIKit

/// Fabric content view for the Apple Pay button.
/// Owns ApplePayView and routes delegate callbacks to @objc closures.
/// ApplePayDelegate conformance is kept in a private class so it never
/// appears in the generated ApplepayRn-Swift.h header.
@objc public class ApplePayBridge: UIView {

  private var applePayView: ApplePayView?
  private var delegateImpl: ApplePayDelegateImpl?

  // MARK: - @objc callbacks (set by ApplepayRnView.mm)

  @objc public var onReadyHandler: (() -> Void)?
  @objc public var onClickHandler: (() -> Void)?
  @objc public var onSuccessHandler: ((String) -> Void)?
  @objc public var onChargeCreatedHandler: ((String) -> Void)?
  @objc public var onOrderCreatedHandler: ((String) -> Void)?
  @objc public var onCancelHandler: (() -> Void)?
  @objc public var onErrorHandler: ((String) -> Void)?
  @objc public var onMerchantValidationHandler: ((String) -> Void)?

  // MARK: - Public API

  @objc public func initApplePay(configJSON: String) {
    guard
      let data = configJSON.data(using: .utf8),
      let configDict = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
    else { return }

    if applePayView == nil {
      let view = ApplePayView()
      applePayView = view
      addSubview(view)
      view.translatesAutoresizingMaskIntoConstraints = false
      NSLayoutConstraint.activate([
        view.topAnchor.constraint(equalTo: topAnchor),
        view.leadingAnchor.constraint(equalTo: leadingAnchor),
        view.trailingAnchor.constraint(equalTo: trailingAnchor),
        view.bottomAnchor.constraint(equalTo: bottomAnchor),
      ])
    }

    let impl = ApplePayDelegateImpl(bridge: self)
    delegateImpl = impl
    applePayView?.initApplePay(configDict: configDict, delegate: impl)
  }
}

// MARK: - Private delegate implementation (never exported to ObjC header)

private class ApplePayDelegateImpl: NSObject, ApplePayDelegate {
  private weak var bridge: ApplePayBridge?

  init(bridge: ApplePayBridge) {
    self.bridge = bridge
  }

  func onReady() { bridge?.onReadyHandler?() }
  func onClick() { bridge?.onClickHandler?() }
  func onSuccess(data: String) { bridge?.onSuccessHandler?(data) }
  func onChargeCreated(data: String) { bridge?.onChargeCreatedHandler?(data) }
  func onOrderCreated(data: String) { bridge?.onOrderCreatedHandler?(data) }
  func onCanceled() { bridge?.onCancelHandler?() }
  func onError(data: String) { bridge?.onErrorHandler?(data) }
  func onMerchantValidation(data: String) { bridge?.onMerchantValidationHandler?(data) }
}
