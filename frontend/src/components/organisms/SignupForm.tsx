import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Label } from '@/components/atoms/Label'
import { useSignupForm } from '@/hooks/auth/useSignupForm'

export const SignupForm = () => {
  const { t } = useTranslation('platform')
  const { clearSubmissionError, form, onSubmit, submissionError } = useSignupForm()

  const {
    formState: { errors, isSubmitting },
    getValues,
    register,
  } = form

  return (
    <form
      className="rounded-[2rem] border border-border/80 bg-card/75 p-6 shadow-[0_32px_120px_-52px_rgba(0,117,255,0.45)] backdrop-blur-2xl"
      onSubmit={onSubmit}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tight text-foreground">
            {t('signup.formTitle')}
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {t('signup.formDescription')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-username">{t('signup.usernameLabel')}</Label>
          <Input
            autoComplete="username"
            id="signup-username"
            placeholder={t('signup.usernamePlaceholder')}
            {...register('username', {
              onChange: clearSubmissionError,
              required: t('signup.validation.usernameRequired'),
            })}
          />
          {errors.username ? (
            <p className="text-sm font-medium text-destructive">
              {errors.username.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">{t('signup.passwordLabel')}</Label>
          <Input
            autoComplete="new-password"
            id="signup-password"
            placeholder={t('signup.passwordPlaceholder')}
            type="password"
            {...register('password', {
              minLength: {
                message: t('signup.validation.passwordMinLength'),
                value: 8,
              },
              onChange: clearSubmissionError,
              required: t('signup.validation.passwordRequired'),
            })}
          />
          {errors.password ? (
            <p className="text-sm font-medium text-destructive">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password-confirmation">
            {t('signup.passwordConfirmationLabel')}
          </Label>
          <Input
            autoComplete="new-password"
            id="signup-password-confirmation"
            placeholder={t('signup.passwordConfirmationPlaceholder')}
            type="password"
            {...register('passwordConfirmation', {
              onChange: clearSubmissionError,
              required: t('signup.validation.passwordConfirmationRequired'),
              validate: (value) =>
                value === getValues('password') ||
                t('signup.validation.passwordConfirmationMismatch'),
            })}
          />
          {errors.passwordConfirmation ? (
            <p className="text-sm font-medium text-destructive">
              {errors.passwordConfirmation.message}
            </p>
          ) : null}
        </div>

        {submissionError ? (
          <div className="rounded-[1.5rem] border border-destructive/25 bg-destructive/8 px-4 py-3 text-sm text-destructive">
            {submissionError}
          </div>
        ) : null}

        <div className="space-y-4">
          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? t('common.loading') : t('signup.submit')}
          </Button>
          <p className="text-sm text-muted-foreground">
            {t('signup.footerPrompt')}{' '}
            <Link className="font-semibold text-primary" to="/login">
              {t('signup.footerAction')}
            </Link>
          </p>
        </div>
      </div>
    </form>
  )
}
