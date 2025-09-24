'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/Button'
import { getClientSideURL } from '@/utilities/getURL'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeftIcon, ArrowRightIcon, SendHorizontalIcon } from 'lucide-react'

interface MultiStepFormProps {
  formId: number
}

type Intent = 'buying' | 'selling' | 'renting' | 'other'
type Timeline = 'immediate' | '1-6-months' | '6+-months' | 'exploring'
type BudgetRange = 'under-250k' | '250k-500k' | '500k-1m' | 'above-1m'
type ContactMethod = 'phone' | 'whatsapp' | 'email'

const steps = [
  { index: 1, label: 'O que o traz aqui hoje?' },
  { index: 2, label: 'Qualificação' },
  { index: 3, label: 'Detalhes de Contato' },
]

interface FormData {
  // Step 1
  intent?: Intent
  timeline?: Timeline

  // Step 2 - Buyers/Investors
  budgetRange?: BudgetRange
  preferredLocations?: string[]

  // Step 2 - Sellers
  propertyLocation?: string
  propertySize?: string
  estimatedValue?: string

  // Step 3
  name?: string
  email?: string
  phone?: string
  preferredContactMethod?: ContactMethod
  message?: string
  acceptPrivacy?: boolean
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ formId }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({})
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const labelStyle = 'text-xs mb-2 block'

  const formatEmailSummary = (data: FormData): string => {
    const intentLabels = {
      buying: 'Comprar',
      selling: 'Vender',
      renting: 'Arrendar',
      other: 'Outro',
    }

    const timelineLabels = {
      immediate: 'Imediato',
      '1-6-months': '1-6 meses',
      '6+-months': '6+ meses',
      exploring: 'Apenas a explorar',
    }

    const budgetLabels = {
      'under-250k': 'Abaixo de €250k',
      '250k-500k': '€250k - €500k',
      '500k-1m': '€500k - €1M',
      'above-1m': 'Acima de €1M',
    }

    const contactMethodLabels = {
      phone: 'Telefone',
      whatsapp: 'WhatsApp',
      email: 'Email',
    }

    // Create summary array for better readability
    const summary = [
      `NOVA SUBMISSÃO DE CONTACTO - ${data.name}`,
      '',
      '=== CONTACTO ===',
      `Nome: ${data.name}`,
      `Email: ${data.email}`,
    ]

    if (data.phone) {
      summary.push(`Telefone: ${data.phone}`)
    }

    if (data.preferredContactMethod) {
      summary.push(`Método preferido: ${contactMethodLabels[data.preferredContactMethod]}`)
    }

    summary.push('', '=== INTERESSE ===')
    summary.push(`Tipo: ${data.intent ? intentLabels[data.intent] : 'Não especificado'}`)
    summary.push(
      `Cronograma: ${data.timeline ? timelineLabels[data.timeline] : 'Não especificado'}`,
    )

    if (data.intent === 'buying') {
      summary.push('', '=== COMPRA ===')
      if (data.budgetRange) {
        summary.push(`Orçamento: ${budgetLabels[data.budgetRange]}`)
      }
      if (data.preferredLocations?.length) {
        summary.push(`Localizações: ${data.preferredLocations.join(', ')}`)
      }
    }

    if (data.intent === 'selling') {
      summary.push('', '=== VENDA ===')
      if (data.propertyLocation) {
        summary.push(`Localização: ${data.propertyLocation}`)
      }
      if (data.propertySize) {
        summary.push(`Tamanho: ${data.propertySize}m²`)
      }
      if (data.estimatedValue) {
        summary.push(`Valor estimado: ${data.estimatedValue}`)
      }
    }

    if (data.message) {
      summary.push('', '=== MENSAGEM ===')
      summary.push(`"${data.message}"`)
    }

    summary.push('', `Data: ${new Date().toLocaleString('pt-PT')}`)
    summary.push('Aceita política de privacidade: Sim')

    return summary.join('\n')
  }

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep === 1 && formData.intent !== 'buying' && formData.intent !== 'selling') {
      setCurrentStep((prev) => prev + 2)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep === 3 && formData.intent !== 'buying' && formData.intent !== 'selling') {
      setCurrentStep((prev) => prev - 2)
    } else {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const submitForm = useCallback(async () => {
    setError(undefined)
    setIsLoading(true)

    // Generate message based on selections
    const intentText = formData.intent
      ? formData.intent.charAt(0).toUpperCase() + formData.intent.slice(1)
      : ''

    const defaultMessage = `Estou interessado em ${intentText.toLowerCase()}.`

    const submissionData = [
      { field: 'emailSummary', value: formatEmailSummary(formData) },
      { field: 'intent', value: formData.intent },
      { field: 'timeline', value: formData.timeline },
      { field: 'budgetRange', value: formData.budgetRange },
      { field: 'preferredLocations', value: formData.preferredLocations?.join(', ') },
      { field: 'propertyLocation', value: formData.propertyLocation },
      { field: 'propertySize', value: formData.propertySize },
      { field: 'estimatedValue', value: formData.estimatedValue },
      { field: 'name', value: formData.name },
      { field: 'email', value: formData.email },
      { field: 'phone', value: formData.phone },
      { field: 'preferredContactMethod', value: formData.preferredContactMethod },
      { field: 'message', value: formData.message || defaultMessage },
      { field: 'acceptPrivacy', value: formData.acceptPrivacy },
    ].filter((item) => item.value !== undefined && item.value !== '')

    try {
      const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        body: JSON.stringify({
          form: formId,
          submissionData,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const res = await req.json()

      if (req.status >= 400) {
        setError(res.errors?.[0]?.message || 'Internal Server Error')
        setIsLoading(false)
        return
      }

      setIsLoading(false)
      setHasSubmitted(true)
    } catch (err) {
      console.warn(err)
      setIsLoading(false)
      setError('Something went wrong.')
    }
  }, [formData, formId])

  if (hasSubmitted) {
    return (
      <motion.div className="text-center max-w-lg ps-4 pe-4 md:pe-0 md:ps-6 mx-auto flex flex-col min-h-[calc(100svh-var(--header-height)-16px)] md:min-h-[calc(100svh-var(--header-height))] justify-center">
        <h2 className="highlight text-sm mb-4 text-balance">Obrigado!</h2>
        <p className="text-lg tracking-tight text-balance">
          Recebemos a sua informação e entraremos em contacto em breve.
        </p>
      </motion.div>
    )
  }

  if (isLoading) {
    return (
      <motion.div className="text-center max-w-lg ps-4 pe-4 md:pe-0 md:ps-6 mx-auto flex flex-col min-h-[calc(100svh-var(--header-height)-16px)] md:min-h-[calc(100svh-var(--header-height))] justify-center">
        <p className="text-lg tracking-tight text-balance">A enviar a sua informação...</p>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div className="text-center max-w-lg mx-auto ps-4 pe-4 md:pe-0 md:ps-6 space-y-6 flex flex-col min-h-[calc(100svh-var(--header-height)-16px)] md:min-h-[calc(100svh-var(--header-height))] justify-center">
        <p className="text-lg tracking-tight text-balance text-red-600">Erro: {error}</p>
        <Button
          onClick={() => setError(undefined)}
          size="sm"
          className="md:px-6 text-xs md:text-sm"
        >
          Tentar Novamente
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto ps-4 pe-4 md:pe-0 md:ps-6 flex flex-col min-h-[calc(100svh-var(--header-height)-16px)] md:min-h-[calc(100svh-var(--header-height))] pb-6">
      {/* Step Indicator */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          {steps.map((step) => (
            <motion.div
              key={step.label}
              className="flex-1 h-0.5 bg-foreground rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: currentStep >= step.index ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <div className="highlight text-sm flex justify-between">
          <span>
            {currentStep} / {steps.length}
          </span>
          <h2 className="inline-block">({steps[currentStep - 1]?.label})</h2>
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 md:space-y-8 flex-1 flex flex-col"
          >
            <div className="space-y-6 md:space-y-8 flex-1 flex flex-col">
              <div>
                <label className={labelStyle}>
                  Estou interessado em <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'buying', label: 'Comprar' },
                    { value: 'selling', label: 'Vender' },
                    { value: 'renting', label: 'Arrendar' },
                    { value: 'other', label: 'Outro' },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      size={'sm'}
                      variant={'link'}
                      onClick={() => updateFormData({ intent: option.value as Intent })}
                      className={`transition-all duration-300 rounded-lg md:px-6 text-xs md:text-sm ${
                        formData.intent === option.value
                          ? 'bg-foreground text-background'
                          : 'bg-secondary text-foreground'
                      }`}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelStyle}>
                  Cronograma <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'immediate', label: 'Imediato' },
                    { value: '1-6-months', label: '1-6 meses' },
                    { value: '6+-months', label: '6+ meses' },
                    { value: 'exploring', label: 'Apenas a explorar' },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      size={'sm'}
                      type="button"
                      onClick={() => updateFormData({ timeline: option.value as Timeline })}
                      className={`transition-all duration-300 rounded-lg md:px-6 text-xs md:text-sm ${
                        formData.timeline === option.value
                          ? 'bg-foreground text-background'
                          : 'bg-secondary text-foreground'
                      }`}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-auto">
              <Button
                onClick={nextStep}
                disabled={!formData.intent || !formData.timeline}
                size="sm"
              >
                Continuar <ArrowRightIcon />
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 md:space-y-8 flex-1 flex flex-col"
          >
            <div className="space-y-6 md:space-y-8 flex-1 flex flex-col">
              {formData.intent === 'buying' && (
                <>
                  <div>
                    <label className={labelStyle}>Orçamento (opcional)</label>
                    <div className="gap-3 grid grid-cols-2">
                      {[
                        { value: 'under-250k', label: 'Abaixo de €250k' },
                        { value: '250k-500k', label: '€250k - €500k' },
                        { value: '500k-1m', label: '€500k - €1M' },
                        { value: 'above-1m', label: 'Acima de €1M' },
                      ].map((option) => (
                        <Button
                          key={option.value}
                          size={'sm'}
                          type="button"
                          onClick={() =>
                            updateFormData({ budgetRange: option.value as BudgetRange })
                          }
                          className={`transition-all duration-300 rounded-lg md:px-6 text-xs md:text-sm ${
                            formData.budgetRange === option.value
                              ? 'bg-foreground text-background'
                              : 'bg-secondary text-foreground'
                          }`}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelStyle}>
                      Localizações preferidas <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="ex: Lisboa, Porto..."
                      className="w-full bg-transparent rounded-none border-b border-foreground/20 pb-2 outline-none focus:border-foreground/60 transition-colors duration-300"
                      value={formData.preferredLocations?.join(', ') || ''}
                      onChange={(e) =>
                        updateFormData({
                          preferredLocations: e.target.value.split(', ').filter(Boolean),
                        })
                      }
                    />
                  </div>
                </>
              )}

              {formData.intent === 'selling' && (
                <>
                  <div>
                    <label className={labelStyle}>Localização da propriedade</label>
                    <input
                      type="text"
                      placeholder="ex: Lisboa, Rua..."
                      className="w-full bg-transparent rounded-none border-b border-foreground/20 pb-2 outline-none focus:border-foreground/60 transition-colors duration-300"
                      value={formData.propertyLocation || ''}
                      onChange={(e) => updateFormData({ propertyLocation: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className={labelStyle}>Tamanho (m²)</label>
                    <input
                      type="text"
                      placeholder="120"
                      className="w-full bg-transparent rounded-none border-b border-foreground/20 pb-2 outline-none focus:border-foreground/60 transition-colors duration-300"
                      value={formData.propertySize || ''}
                      onChange={(e) => updateFormData({ propertySize: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className={labelStyle}>Valor estimado</label>
                    <input
                      type="text"
                      placeholder="€350.000"
                      className="w-full bg-transparent rounded-none border-b border-foreground/20 pb-2 outline-none focus:border-foreground/60 transition-colors duration-300"
                      value={formData.estimatedValue || ''}
                      onChange={(e) => updateFormData({ estimatedValue: e.target.value })}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-4 justify-end">
              <Button onClick={prevStep} variant="ghost" size="sm">
                <ArrowLeftIcon /> Voltar
              </Button>
              <Button
                disabled={
                  (!formData.preferredLocations || formData.preferredLocations.length === 0) &&
                  formData.intent == 'buying'
                }
                onClick={nextStep}
                size="sm"
              >
                Continuar <ArrowRightIcon />
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 md:space-y-8 flex-1 flex flex-col"
          >
            <div className="space-y-6 md:space-y-8 flex-1 flex flex-col">
              <div>
                <label className={labelStyle}>
                  Nome <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="João Silva"
                  className="w-full bg-transparent rounded-none border-b border-foreground/20 pb-2 outline-none focus:border-foreground/60 transition-colors duration-300"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="joao@exemplo.com"
                    className="w-full bg-transparent rounded-none border-b border-foreground/20 pb-2 outline-none focus:border-foreground/60 transition-colors duration-300"
                    value={formData.email || ''}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Telefone</label>
                  <input
                    type="tel"
                    placeholder="+351 912 345 678"
                    className="w-full bg-transparent rounded-none border-b border-foreground/20 pb-2 outline-none focus:border-foreground/60 transition-colors duration-300"
                    value={formData.phone || ''}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Método de contacto preferido</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'phone', label: 'Telefone' },
                    { value: 'whatsapp', label: 'WhatsApp' },
                    { value: 'email', label: 'Email' },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      size={'sm'}
                      onClick={() =>
                        updateFormData({ preferredContactMethod: option.value as ContactMethod })
                      }
                      className={`transition-all duration-300 rounded-lg px-4 md:px-6 text-xs md:text-sm ${
                        formData.preferredContactMethod === option.value
                          ? 'bg-foreground text-background'
                          : 'bg-secondary text-foreground'
                      }`}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelStyle}>Mensagem (opcional)</label>
                <textarea
                  placeholder={`Estou interessado em...`}
                  className="w-full bg-transparent border border-foreground/20 rounded p-4 outline-none text-sm resize-none h-20 focus:border-foreground/60 transition-colors duration-300"
                  value={formData.message || ''}
                  onChange={(e) => updateFormData({ message: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 justify-end mt-auto">
              <div className="me-auto">
                <label className={labelStyle}>
                  <input
                    type="checkbox"
                    checked={formData.acceptPrivacy || false}
                    onChange={(e) => updateFormData({ acceptPrivacy: e.target.checked })}
                    className="mr-2"
                  />
                  <span>
                    Aceito a política de privacidade e concordo em ser contactado sobre a minha
                    consulta *
                  </span>
                </label>
              </div>
              <div className="flex gap-4 justify-end">
                <Button onClick={prevStep} variant="ghost" size="sm">
                  <ArrowLeftIcon /> Voltar
                </Button>
                <Button
                  onClick={submitForm}
                  disabled={!formData.name || !formData.email || !formData.acceptPrivacy}
                  size="sm"
                >
                  Enviar <SendHorizontalIcon />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MultiStepForm
