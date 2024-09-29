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

    RESET_PASSWORD: {
      TITLE: 'Set New Password',
      HEADING: 'Set new password for account',
      SUB_TITLE: 'Go back to ',
      SIGN_IN: 'Sign In',
      DONE: 'Done	',
      TEXTS: {
        NEW_PASS: 'Set New Password',
      },
      ALERTS: {
        VALIDATIONS: {
          INVALID_PASSWORD: 'Please enter password',
          PASSWORDS_NOT_MATCH: 'Passwords do not match',
        },
        ERRORS: {
          RESET_PASSWORD:
            'An error occurred during password reset. Please try again.',
        },
        PASSWORD_CHANGED: 'Password changed successfully',
      },
      FIELDS: {
        PASSWORD: 'Password',
        CONFIRM_PASSWORD: 'Re Password',
      },
    },
  },

  RUS: {
    APP_NAME: 'Ближайшие мероприятия',
    LOGIN: {
      HEADING: 'Пожалуйста, введите свой email и пароль, чтобы продолжить',
      GREETING: 'Добро пожаловать обратно',
      SUB_TITLE: 'Нет учетной записи. ',
      REMEMBER: 'Запомнить меня',
      FORGET_PASS: 'Забыли пароль?',
      SIGN_IN: 'Войти',
      SIGN_UP: 'Зарегистрироваться',
      ALERTS: {
        VALIDATIONS: {
          INVALID_EMAIL: 'Пожалуйста, введите email',
          INVALID_PASSWORD: 'Пожалуйста, введите пароль',
        },
      },
      FIELDS: {
        EMAIL: 'Email',
        PASSWORD: 'Пароль',
      },
    },
  },

  French: {
    APP_NAME: 'Localiser des Événements Nearby',
    LOGIN: {
      HEADING:
        'Veuillez entrer votre adresse email et mot de passe pour continuer',
      GREETING: 'Bienvenue de nouveau',
      SUB_TITLE: 'Pas encore de compte? ',
      REMEMBER: 'Souviens-toi de moi',
      FORGET_PASS: 'Mot de passe oublié?',
      SIGN_IN: 'Se connecter',
      SIGN_UP: "S'inscrire",
      ALERTS: {
        VALIDATIONS: {
          INVALID_EMAIL: 'Veuillez entrer une adresse email valide',
          INVALID_PASSWORD: 'Veuillez entrer un mot de passe valide',
        },
      },
      FIELDS: {
        EMAIL: 'Email',
        PASSWORD: 'Mot de passe',
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
