# ApplePay-RN

A comprehensive React Native bridge to Apple Pay integration that brings native iOS Apple Pay functionality to React Native apps. Simplifies secure payment processing with Apple Pay, including native callback handling and seamless TypeScript support.

## Overview

ApplePay-RN provides a complete React Native wrapper around the native Apple Pay iOS framework. It enables React Native developers to integrate Apple Pay payments into their applications with minimal effort while maintaining full access to native payment capabilities.

**Key Features:**
- ✅ Native Apple Pay integration for React Native
- ✅ TypeScript support with full type definitions
- ✅ Comprehensive callback system for payment events
- ✅ Flexible configuration options matching native API
- ✅ Support for multiple payment scenarios (one-time, recurring, deferred)
- ✅ Automatic native module linking (autolinking)
- ✅ Example app demonstrating best practices

## Requirements

- **React Native**: 0.60+
- **iOS**: 16.0+ (minimum deployment target)
- **Xcode**: 14.0+
- **CocoaPods**: For iOS dependency management
- **Node.js**: 14.0+
- **Yarn/npm**: For JavaScript package management

## Installation

### 1. Install the Package

Using npm:
```bash
npm install applepay-rn
```

Using yarn:
```bash
yarn add applepay-rn
```

### 2. Install Pod Dependencies

Navigate to the iOS directory and install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

## Quick Start

### 1. Import the Component

```typescript
import ApplePayView from '@tap-payments/applepay-rn';
```

### 2. Create Configuration

Define your payment configuration:

```typescript
const applePayConfig = {
  // REQUIRED
  publicKey: "pk_test_********",
  scope: "AppleToken",
  merchant: {
    id: "********"
  },
  
  // OPTIONAL
  interface: {
    locale: "en",
    theme: "light",
    edges: "curved",
    type: "buy"
  },
  
  // REQUIRED
  customer: {
    name: [
      {
        lang: "en",
        first: "John",
        last: "Smith"
      }
    ],
    contact: {
      email: "john.smith@example.com",
      phone: {
        countryCode: "+1",
        number: "5551234567"
      }
    }
  },
  
  // REQUIRED
  acceptance: {
    supportedBrands: ["visa", "masterCard"],
    supportedCards: ["credit", "debit"]
  },
  
  // REQUIRED
  transaction: {
    amount: "20.00",
    currency: "KWD"
  }
};
```

### 3. Use the Component

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ApplePayView from '@tap-payments/applepay-rn';

const App = () => {
  return (
    <View style={styles.container}>
      <ApplePayView
        config={applePayConfig}
        onReady={() => console.log('Apple Pay ready')}
        onClick={() => console.log('Button clicked')}
        onSuccess={(data) => console.log('Payment successful:', data)}
        onError={(error) => console.log('Payment error:', error)}
        onCanceled={() => console.log('Payment canceled')}
        onMerchantValidation={(data) => console.log('Merchant validation:', data)}
        style={styles.applePayButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  applePayButton: {
    height: 50,
  },
});

export default App;
```

## Configuration Parameters

### Core Configuration

| Parameter | Description | Required | Type | Example |
|-----------|-------------|----------|------|---------|
| `publicKey` | Your Tap public API key for authentication | ✅ | String | `"pk_test_********"` |
| `scope` | Token scope type ('AppleToken' or 'TapToken') | ✅ | String | `"AppleToken"` |
| `merchant` | Merchant account information with ID | ✅ | Object | `{ id: "********" }` |

### Transaction Configuration (REQUIRED)

```typescript
const transaction = {
  // REQUIRED: Transaction amount as string
  amount: "20.00",
  
  // REQUIRED: ISO 4217 currency code (e.g., KWD, USD, AED)
  currency: "KWD",
  
  // OPTIONAL: Coupon code for discount
  couponCode: "SAVE10",
  
  // OPTIONAL: Shipping options for the transaction
  shipping: [
    {
      // REQUIRED: Shipping method label
      label: "Standard Shipping",
      // REQUIRED: Shipping description
      detail: "5–7 business days",
      // REQUIRED: Shipping cost
      amount: "1.00",
      // REQUIRED: Unique identifier
      identifier: "std"
    }
  ],
  
  // OPTIONAL: Line items breakdown
  items: [
    {
      // REQUIRED: Item type ('final' or 'pending')
      type: "final",
      // REQUIRED: Item label/description
      label: "Product Order",
      // REQUIRED: Item amount
      amount: "20.00",
      // REQUIRED: Payment timing ('immediate', 'recurring', 'deferred', 'automaticReload')
      paymentTiming: "immediate"
    }
  ]
};
```

### Customer Configuration (REQUIRED)

```typescript
const customer = {
  // OPTION 1: Use customer ID (if customer already exists in system)
  // id: "cust_123",
  
  // OPTION 2: Provide customer details
  name: [
    {
      // REQUIRED: Language code ('en', 'ar', 'fr')
      lang: "en",
      // REQUIRED: First name
      first: "John",
      // REQUIRED: Last name
      last: "Smith",
      // OPTIONAL: Middle name
      middle: "David"
    }
  ],
  
  // REQUIRED: At least email OR phone (or both)
  contact: {
    // OPTIONAL: Email address (required if phone not provided)
    email: "john.smith@example.com",
    
    // OPTIONAL: Phone number (required if email not provided)
    phone: {
      // REQUIRED IF PHONE PROVIDED: Country code with + prefix
      countryCode: "+1",
      // REQUIRED IF PHONE PROVIDED: Phone number
      number: "5551234567"
    }
  }
};
```

### Interface Configuration (OPTIONAL)

```typescript
const interfaceConfig = {
  // OPTIONAL: Display language ('en' or 'ar', defaults to 'en')
  locale: "en",
  
  // OPTIONAL: Theme mode ('light', 'dark', or 'dynamic', defaults to 'light')
  theme: "light",
  
  // OPTIONAL: Button edges style ('curved' or 'flat', defaults to 'curved')
  edges: "curved",
  
  // OPTIONAL: Button type ('book', 'buy', 'check-out', 'pay', 'plain', 'subscribe')
  type: "buy"
};
```

### Acceptance Configuration (REQUIRED)

```typescript
const acceptance = {
  // REQUIRED: Supported card brands/networks
  // Options: 'amex', 'mada', 'masterCard', 'visa', 'chinaUnionPay', 'discover', 'electron', 'jcb', 'maestro'
  supportedBrands: ["visa", "masterCard"],
  
  // REQUIRED: Supported card types
  // Options: 'credit', 'debit'
  supportedCards: ["credit", "debit"],
  
  // OPTIONAL: Supported regions for payments
  // Options: 'LOCAL' (within country), 'REGIONAL' (regional area), 'GLOBAL' (worldwide)
  supportedRegions: ["LOCAL", "REGIONAL"],
  
  // OPTIONAL: Supported countries (ISO 3166-1 alpha-2 codes)
  supportedCountries: ["AE", "KW", "SA", "QA", "BH", "OM", "EG", "JO", "LB"]
};
```

### Features Configuration (OPTIONAL)

```typescript
const features = {
  // OPTIONAL: Allow coupon code entry (defaults to false)
  supportsCouponCode: true,
  
  // OPTIONAL: Shipping contact fields to collect from user
  // Options: "name" (customer name), "phone" (phone number), "email" (email address)
  // Can be empty array [] to not collect any fields
  shippingContactFields: ["name", "phone", "email"]
};
```

## Component Props

### ApplePayView Props

```typescript
interface ApplePayViewProps {
  // Payment configuration object (required)
  config: ApplePayConfig;
  
  // Callback when Apple Pay view is ready
  onReady?: () => void;
  
  // Callback when user clicks the Apple Pay button
  onClick?: () => void;
  
  // Callback when payment succeeds
  onSuccess?: (data: string) => void;
  
  // Callback when payment fails
  onError?: (data: string) => void;
  
  // Callback when user cancels payment
  onCanceled?: () => void;
  
  // Callback for merchant validation
  onMerchantValidation?: (data: string) => void;
  
  // Callback when order is created
  onOrderCreated?: (data: string) => void;
  
  // Callback when charge is created
  onChargeCreated?: (data: string) => void;
  
  // View style props (optional)
  style?: StyleProp<ViewStyle>;
}
```

## Callback Responses

### onSuccess Response Example

```json
{
  "id": "tok_4WUP3423199C4Vp18rY9y554",
  "created": 1697656174554,
  "object": "token",
  "type": "CARD",
  "card": {
    "id": "card_U8Wb34231992m7q185g9i558",
    "brand": "VISA",
    "last_four": "4242",
    "exp_month": 2,
    "exp_year": 44
  }
}
```

### onError Response Example

```json
{
  "error": {
    "code": "PAYMENT_FAILED",
    "message": "The payment could not be processed"
  }
}
```

## Advanced Usage

### Recurring Payments

For subscription or recurring payment scenarios:

```typescript
const recurringConfig = {
  transaction: {
    items: [
      {
        type: "final",
        label: "Monthly Subscription",
        amount: "9.99",
        paymentTiming: "recurring",
        scheduledPayment: {
          recurringStartDate: new Date().toISOString(),
          recurringIntervalUnit: "month",
          recurringIntervalCount: 1
        }
      }
    ]
  }
};
```

### Deferred Payments

For payments scheduled for a future date:

```typescript
const deferredConfig = {
  transaction: {
    items: [
      {
        type: "final",
        label: "Product Order",
        amount: "20.00",
        paymentTiming: "deferred",
        scheduledPayment: {
          deferredPaymentDate: new Date(Date.now() + 86400000).toISOString()
        }
      }
    ]
  }
};
```

### Multiple Shipping Options

```typescript
const shippingConfig = {
  transaction: {
    shipping: [
      {
        label: "Standard",
        detail: "5–7 days",
        amount: "1.00",
        identifier: "std"
      },
      {
        label: "Express",
        detail: "2–3 days",
        amount: "5.00",
        identifier: "exp"
      }
    ]
  }
};
```

## Error Handling

Always implement error handling in your callbacks:

```typescript
const handleError = (errorData: string) => {
  try {
    const error = JSON.parse(errorData);
    if (error.error) {
      const { code, message } = error.error;
      console.error(`Error ${code}: ${message}`);
      // Handle error appropriately
    }
  } catch (e) {
    console.error('Failed to parse error:', errorData);
  }
};
```

## Example Application

A complete example application is included in the `example` folder demonstrating:

- Basic Apple Pay integration
- Configuration management
- Real-time event logging
- Multiple payment scenarios
- Error handling

Run the example app:

```bash
cd example
npm install
cd ios
pod install
cd ..
npm run ios
```

## Native Dependency

This library wraps the native **ApplePay-iOS** module. The native bridge handles:

- Native Apple Pay sheet presentation
- Payment processing
- Merchant validation
- Native callback bridging to React Native

For detailed native implementation, see: [ApplePay-iOS](https://github.com/Tap-Payments/ApplePay-iOS)

## Security Considerations

✅ **Best Practices:**
- Never expose your secret keys in your app (only use public keys)
- Always validate payment responses on your backend
- Use HTTPS for all communication
- Never log sensitive payment data
- Keep dependencies updated for security patches
- Use TypeScript for type-safe payment configurations

## Troubleshooting

### Apple Pay not appearing
- Ensure you're testing on a physical iOS device with Apple Pay configured
- Verify your merchant identifier is correct
- Check that your app signing certificate is properly configured
- Ensure Apple Pay is enabled in Xcode capabilities

### Payment failures
- Verify your Tap API keys are correct
- Check that your public key corresponds to your merchant account
- Ensure the device has Apple Pay set up
- Verify the transaction amount is valid

### Configuration errors
- Validate all required fields are present in the configuration object
- Check for typos in parameter keys (they are case-sensitive)
- Ensure currency codes are valid ISO 4217 codes
- Use TypeScript to catch configuration errors at compile time

### Build issues
- Run `pod install` in the ios directory after adding the package
- Clear build cache: `cd ios && rm -rf Pods && pod install`
- For autolinking issues, verify your React Native version is 0.60+

## Support & Documentation

- **Developer Documentation**: [docs.tap.company](https://developers.tap.company)
- **API Reference**: [Tap API Documentation](https://developers.tap.company/docs)
- **iOS Native Module**: [ApplePay-iOS](https://github.com/Tap-Payments/ApplePay-iOS)
- **Issue Tracker**: [GitHub Issues](https://github.com/Tap-Payments/ApplePay-RN/issues)

## License

MIT License - See LICENSE file for details

## Contributing

We welcome contributions! Please feel free to submit pull requests with bug fixes, feature additions, or documentation improvements.

## Version History

### 0.0.1
- Initial release
- React Native bridge to Apple Pay iOS
- TypeScript support
- Comprehensive callback system
- Example app

---

**Built with ❤️ by Tap Payments**
