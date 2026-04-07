#import "ApplepayRnView.h"

#import <react/renderer/components/NativeApplePayViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/NativeApplePayViewSpec/Props.h>
#import <react/renderer/components/NativeApplePayViewSpec/RCTComponentViewHelpers.h>
#import <react/renderer/components/NativeApplePayViewSpec/EventEmitters.h>

#import "RCTFabricComponentsPlugins.h"
#import "ApplepayRn-Swift.h"

using namespace facebook::react;

@implementation ApplepayRnView {
  ApplePayBridge * _bridge;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<NativeApplePayViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const NativeApplePayViewProps>();
    _props = defaultProps;

    _bridge = [[ApplePayBridge alloc] initWithFrame:frame];
    self.contentView = _bridge;

    __weak __typeof(self) weakSelf = self;

    _bridge.onReadyHandler = ^{
      __typeof(self) strongSelf = weakSelf;
      if (!strongSelf || !strongSelf->_eventEmitter) return;
      auto emitter = std::static_pointer_cast<NativeApplePayViewEventEmitter const>(strongSelf->_eventEmitter);
      emitter->onApplePayReady({});
    };

    _bridge.onClickHandler = ^{
      __typeof(self) strongSelf = weakSelf;
      if (!strongSelf || !strongSelf->_eventEmitter) return;
      auto emitter = std::static_pointer_cast<NativeApplePayViewEventEmitter const>(strongSelf->_eventEmitter);
      emitter->onApplePayClick({});
    };

    _bridge.onSuccessHandler = ^(NSString * data) {
      __typeof(self) strongSelf = weakSelf;
      if (!strongSelf || !strongSelf->_eventEmitter) return;
      auto emitter = std::static_pointer_cast<NativeApplePayViewEventEmitter const>(strongSelf->_eventEmitter);
      emitter->onApplePaySuccess({ .data = std::string([data UTF8String]) });
    };

    _bridge.onChargeCreatedHandler = ^(NSString * data) {
      __typeof(self) strongSelf = weakSelf;
      if (!strongSelf || !strongSelf->_eventEmitter) return;
      auto emitter = std::static_pointer_cast<NativeApplePayViewEventEmitter const>(strongSelf->_eventEmitter);
      emitter->onApplePayChargeCreated({ .data = std::string([data UTF8String]) });
    };

    _bridge.onOrderCreatedHandler = ^(NSString * data) {
      __typeof(self) strongSelf = weakSelf;
      if (!strongSelf || !strongSelf->_eventEmitter) return;
      auto emitter = std::static_pointer_cast<NativeApplePayViewEventEmitter const>(strongSelf->_eventEmitter);
      emitter->onApplePayOrderCreated({ .data = std::string([data UTF8String]) });
    };

    _bridge.onCancelHandler = ^{
      __typeof(self) strongSelf = weakSelf;
      if (!strongSelf || !strongSelf->_eventEmitter) return;
      auto emitter = std::static_pointer_cast<NativeApplePayViewEventEmitter const>(strongSelf->_eventEmitter);
      emitter->onApplePayCancel({});
    };

    _bridge.onErrorHandler = ^(NSString * data) {
      __typeof(self) strongSelf = weakSelf;
      if (!strongSelf || !strongSelf->_eventEmitter) return;
      auto emitter = std::static_pointer_cast<NativeApplePayViewEventEmitter const>(strongSelf->_eventEmitter);
      emitter->onApplePayError({ .error = std::string([data UTF8String]) });
    };

    _bridge.onMerchantValidationHandler = ^(NSString * data) {
      __typeof(self) strongSelf = weakSelf;
      if (!strongSelf || !strongSelf->_eventEmitter) return;
      auto emitter = std::static_pointer_cast<NativeApplePayViewEventEmitter const>(strongSelf->_eventEmitter);
      emitter->onApplePayMerchantValidation({ .data = std::string([data UTF8String]) });
    };
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &newViewProps = *std::static_pointer_cast<NativeApplePayViewProps const>(props);
  const auto &currentProps = *std::static_pointer_cast<NativeApplePayViewProps const>(_props);

  if (!newViewProps.configuration.empty() &&
      newViewProps.configuration != currentProps.configuration) {
    NSString *configJSON = [NSString stringWithUTF8String:newViewProps.configuration.c_str()];
    [_bridge initApplePayWithConfigJSON:configJSON];
  }

  [super updateProps:props oldProps:oldProps];
}

@end

Class<RCTComponentViewProtocol> ApplepayRnViewCls(void) {
  return ApplepayRnView.class;
}
