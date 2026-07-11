import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { Button } from '@/components/ui/Button'
import { contactFormSchema, type ContactFormSchema } from '@/lib/validation'
import { services } from '@/data/services'
import { submitContactForm } from '@/services/contactService'
import { cn } from '@/lib/utils'

const budgetKeys = ['small', 'medium', 'large', 'enterprise'] as const

const inputClass =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20'

export function ContactForm() {
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' },
  })

  const onSubmit = async (data: ContactFormSchema) => {
    try {
      await submitContactForm(data)
      setFeedback('success')
      reset()
    } catch {
      setFeedback('error')
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-5 rounded-3xl border border-ink-100 bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">
            {t('contact.form.name')}
          </label>
          <input
            id="name"
            type="text"
            placeholder={t('contact.form.namePlaceholder')}
            className={cn(
              inputClass,
              errors.name && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
            )}
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
            {t('contact.form.email')}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t('contact.form.emailPlaceholder')}
            className={cn(
              inputClass,
              errors.email && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
            )}
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-700">
            {t('contact.form.phone')}
          </label>
          <input
            id="phone"
            type="tel"
            placeholder={t('contact.form.phonePlaceholder')}
            className={cn(
              inputClass,
              errors.phone && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
            )}
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink-700">
            {t('contact.form.company')}
          </label>
          <input
            id="company"
            type="text"
            placeholder={t('contact.form.companyPlaceholder')}
            className={inputClass}
            {...register('company')}
          />
        </div>

        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink-700">
            {t('contact.form.service')}
          </label>
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <select
                id="service"
                className={cn(inputClass, errors.service && 'border-red-400', !field.value && 'text-ink-400')}
                aria-invalid={!!errors.service}
                {...field}
              >
                <option value="">{t('contact.form.servicePlaceholder')}</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {t(service.titleKey)}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>}
        </div>

        <div>
          <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-ink-700">
            {t('contact.form.budget')}
          </label>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <select
                id="budget"
                className={cn(inputClass, errors.budget && 'border-red-400', !field.value && 'text-ink-400')}
                aria-invalid={!!errors.budget}
                {...field}
              >
                <option value="">{t('contact.form.budgetPlaceholder')}</option>
                {budgetKeys.map((key) => (
                  <option key={key} value={key}>
                    {t(`contact.form.budgets.${key}`)}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.budget && <p className="mt-1 text-xs text-red-500">{errors.budget.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
          {t('contact.form.message')}
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder={t('contact.form.messagePlaceholder')}
          className={cn(
            inputClass,
            'resize-none',
            errors.message && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
          )}
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        icon={<Send size={16} />}
        className="self-start"
      >
        {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
      </Button>

      <Snackbar
        open={feedback !== null}
        autoHideDuration={5000}
        onClose={() => setFeedback(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setFeedback(null)}
          severity={feedback === 'success' ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {feedback === 'success' ? t('contact.form.success') : t('contact.form.error')}
        </Alert>
      </Snackbar>
    </motion.form>
  )
}
