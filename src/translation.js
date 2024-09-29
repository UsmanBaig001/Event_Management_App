export const LAN = {
  EN: {
    APP_NAME: 'Nearby Event Locator',

    LOGIN: {
      HEADING: 'Please enter your email and password to continue',
      GREETING: 'Welcome back',
      SUB_TITLE: "Don't have an account. ",
      REMEMBER: 'Remember me',
      FORGET_PASS: 'Forgot Password?',
      SIGN_IN: 'Sign In',
      SIGN_UP: 'Sign Up',
      ALERTS: {
        VALIDATIONS: {
          INVALID_EMAIL: 'Please enter email',
          INVALID_PASSWORD: 'Please enter password',
        },
      },
      FIELDS: {
        EMAIL: 'Email',
        PASSWORD: 'Password',
      },
    },

    SIGNUP: {
      SIGN_UP: 'Sign Up',
      SIGN_IN: 'Sign In',
      ACCOUNT: 'Create account',
      HEADING: 'Please enter field below to continue',
      SUB_TITLE: 'Already have an account? ',
      ALERTS: {
        VALIDATIONS: {
          INVALID_NAME: 'Please enter full name',
          INVALID_EMAIL: 'Please enter email',
          INVALID_DOB: 'Please enter DOB',
          INVALID_LOCATION: 'Please enter where you live',
          INVALID_PASSWORD: 'Please enter password',
          PASSWORDS_NOT_MATCH: 'Passwords do not match',
        },
        ERRORS: {
          SEND_MAIL: 'Failed to send email. Please try again.',
          REGISTRATION:
            'An error occurred during registration. Please try again.',
        },
      },
      FIELDS: {
        NAME: 'Full Name',
        EMAIL: 'Email',
        LOCATION: 'Where do you live?',
        PASSWORD: 'Password',
        CONFIRM_PASSWORD: 'Re Password',
      },
    },

    FORGET_PASSWORD: {
      TITLE: 'Forgot Password',
      HEADING:
        'Enter email associated with your account and we will send email instruction to reset your password.',
      SUB_TITLE: 'Go back to ',
      SIGN_IN: 'Sign In',
      ALERTS: {
        VALIDATIONS: {
          INVALID_EMAIL: 'Please enter email',
        },
        ERRORS: {
          SEND_MAIL: 'Failed to send email. Please try again.',
          RESET_PASSWORD:
            'An error occurred during password forget. Please try again.',
        },
      },
      BUTTONS: {
        OTP: 'Send OTP',
      },
      FIELDS: {
        EMAIL: 'Email',
      },
    },

    OTP: {
      TITLE: 'Verify OTP',
      HEADING: 'Please check your inbox for OTP',
      VERIFY: 'Verify',
      RESEND: 'Resend?',
      ALERTS: {
        VALIDATIONS: {
          INVALID_OTP: 'Please enter OTP',
          INCORRECT_OTP: 'Please enter correct OTP',
        },
        SENT_AGAIN: 'Code sent again',
      },
    },
  },
};

const EXTRA = {
  LOGIN_FAILED: 'Invalid email or password.',
  EMAIL_EXISTS: 'Email already exists.',
  SUCCESS_LOGIN: 'Logged in successfully.',
  SUCCESS_FORGOT_PASSWORD: 'Password reset email sent successfully.',
  WELCOME: 'Welcome to Nearby Event Locator',
  TICKET_LIST_EMPTY: 'Tickets list empty.',
  TYPE_YOUR_MSG: 'Type your message',
  VALIDATION: {
    EVENT_VALIDATION: {
      EVENT_NAME: 'Please enter event name',
      EVENT_DESCRIPTION: 'Please enter event description',
      EVENT_TYPE: 'Please enter event type',
      LIMIT: 'Please enter limit',
      EVENT_START_DATE: 'Please select event start date',
      EVENT_END_DATE: 'Please select event end date',
      EVENT_PRICE: 'Please select event price',
      EVENT_IMAGE: 'Please select event image',
      EVENT_LOCATION: 'Please select event location',
    },
  },
};
