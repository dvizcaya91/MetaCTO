import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Label } from '@/components/atoms/Label'
import { useLoginForm } from '@/hooks/auth/useLoginForm'

export const LoginForm = () => {
  const { t } = useTranslation('platform')
  const { clearSubmissionError, form, onSubmit, submissionError } = useLoginForm()

  const {
    formState: { errors, isSubmitting },
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
            {t('login.formTitle')}
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {t('login.formDescription')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="login-username">{t('login.usernameLabel')}</Label>
          <Input
            autoComplete="username"
            id="login-username"
            placeholder={t('login.usernamePlaceholder')}
            {...register('username', {
              onChange: clearSubmissionError,
              required: t('login.validation.usernameRequired'),
            })}
          />
          {errors.username ? (
            <p className="text-sm font-medium text-destructive">
              {errors.username.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="login-password">{t('login.passwordLabel')}</Label>
          <Input
            autoComplete="current-password"
            id="login-password"
            placeholder={t('login.passwordPlaceholder')}
            type="password"
            {...register('password', {
              onChange: clearSubmissionError,
              required: t('login.validation.passwordRequired'),
            })}
          />
          {errors.password ? (
            <p className="text-sm font-medium text-destructive">
              {errors.password.message}
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
            {isSubmitting ? t('common.loading') : t('login.submit')}
          </Button>
          <p className="text-sm text-muted-foreground">
            {t('login.footerPrompt')}{' '}
            <Link className="font-semibold text-primary" to="/signup">
              {t('login.footerAction')}
            </Link>
          </p>
        </div>
      </div>
    </form>
  )
}
