/** State for managing checkout data */
export type CheckoutFormState = {
  deliveryName: string
  deliveryAddress: string
  deliveryAddressTwo: string
  deliveryCity: string
  deliveryZipCode: string
  deliveryState: string

  nameOnCard: string
  ccNumber: string
  cvv: string
  expiryMonth: string
  expiryYear: string
  cardZipCode: string

  billingName: string
  billingAddress: string
  billingAddressTwo: string
  billingCity: string
  billingZipCode: string
  billingState: string

  total: string;
  tax: string;
}

/** Actions for updating checkout reducer data */
export type CheckoutFormAction = | {
  type: "reset"
} | {
  type: "update", 
  payload: {
    deliveryName: string
    deliveryAddress: string
    deliveryAddressTwo: string
    deliveryCity: string
    deliveryZipCode: string
    deliveryState: string

    nameOnCard: string
    ccNumber: string
    cvv: string
    expiryMonth: string
    expiryYear: string
    cardZipCode: string

    billingName: string
    billingAddress: string
    billingAddressTwo: string
    billingCity: string
    billingZipCode: string
    billingState: string

    total: string;
    tax: string;
  }
} | { type: 'billingSameAsDelivery'}

/** Initial values for checkout reducer */
export const checkoutInitialValues = {
  deliveryName: '',
  deliveryAddress: '',
  deliveryAddressTwo: '',
  deliveryCity: '',
  deliveryZipCode: '',
  deliveryState: '',

  nameOnCard: '',
  ccNumber: '',
  cvv: '',
  expiryMonth: '',
  expiryYear: '',
  cardZipCode: '',

  billingName: '',
  billingAddress: '',
  billingAddressTwo: '',
  billingCity: '',
  billingZipCode: '',
  billingState: '',

  total: '',
  tax: '',
}

/**
 * Checkout reducer.
 * 
 * @param state CheckoutFormState
 * @param action CheckoutFormAction
 * @returns Map of checkout data
 */
export const checkoutReducer = (state: CheckoutFormState, action: CheckoutFormAction) => {
  switch (action.type) {
    case 'reset':
      return checkoutInitialValues;
    case 'update':
      return {
        ...state,
        deliveryName: action.payload.deliveryName,
        deliveryAddress: action.payload.deliveryAddress,
        deliveryAddressTwo: action.payload.deliveryAddressTwo,
        deliveryCity: action.payload.deliveryCity,
        deliveryZipCode: action.payload.deliveryZipCode,
        deliveryState: action.payload.deliveryState,

        nameOnCard: action.payload.nameOnCard,
        ccNumber: action.payload.ccNumber,
        cvv: action.payload.cvv,
        expiryMonth: action.payload.expiryMonth,
        expiryYear: action.payload.expiryYear,
        cardZipCode: action.payload.cardZipCode,

        billingName: action.payload.billingName,
        billingAddress: action.payload.billingAddress,
        billingAddressTwo: action.payload.billingAddressTwo,
        billingCity: action.payload.billingCity,
        billingZipCode: action.payload.billingZipCode,
        billingState: action.payload.billingState,

        tax: action.payload.tax,
        total: action.payload.total
      }
    case 'billingSameAsDelivery': 
      return {
        ...state,
        billingName: state.deliveryName,
        billingAddress: state.deliveryAddress,
        billingAddressTwo: state.deliveryAddressTwo,
        billingCity: state.deliveryCity,
        billingZipCode: state.deliveryZipCode,
        billingState: state.deliveryState,
      }
    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}