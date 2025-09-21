'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/Button'
import { getClientSideURL } from '@/utilities/getURL'
import Container from '@/components/Container'
import { motion } from 'motion/react'

interface MultiStepFormProps {
  formId: number
}

type Intent = 'buying' | 'selling' | 'renting' | 'investing'
type PropertyType = 'residential' | 'commercial' | 'land'
type Timeline = 'immediate' | '1-3-months' | '3-6-months' | 'exploring'
type BudgetRange = 'under-250k' | '250k-500k' | '500k-1m' | '1m-2.5m' | 'above-2.5m'
type Financing = 'cash' | 'pre-approved' | 'need-financing'
type SellingReason = 'upgrade' | 'downsize' | 'investment' | 'relocation'
type ContactMethod = 'phone' | 'whatsapp' | 'email'

interface FormData {
  // Step 1
  intent?: Intent
  propertyType?: PropertyType
  timeline?: Timeline

  // Step 2 - Buyers/Investors
  budgetRange?: BudgetRange
  preferredLocations?: string[]
  financing?: Financing

  // Step 2 - Sellers
  propertyLocation?: string
  propertySize?: string
  estimatedValue?: string
  sellingReason?: SellingReason

  // Step 3
  name?: string
  email?: string
  phone?: string
  whatsappEnabled?: boolean
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

  const labelStyle = 'text-xs mb-1 line-split-animation'

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const submitForm = useCallback(async () => {
    setError(undefined)
    setIsLoading(true)

    // Generate message based on selections
    const intentText = formData.intent
      ? formData.intent.charAt(0).toUpperCase() + formData.intent.slice(1)
      : ''
    const propertyTypeText = formData.propertyType
      ? formData.propertyType.charAt(0).toUpperCase() + formData.propertyType.slice(1)
      : ''
    const defaultMessage = `Estou interessado em ${intentText.toLowerCase()} propriedade ${propertyTypeText.toLowerCase()}.`

    const submissionData = [
      { field: 'intent', value: formData.intent },
      { field: 'propertyType', value: formData.propertyType },
      { field: 'timeline', value: formData.timeline },
      { field: 'budgetRange', value: formData.budgetRange },
      { field: 'preferredLocations', value: formData.preferredLocations?.join(', ') },
      { field: 'financing', value: formData.financing },
      { field: 'propertyLocation', value: formData.propertyLocation },
      { field: 'propertySize', value: formData.propertySize },
      { field: 'estimatedValue', value: formData.estimatedValue },
      { field: 'sellingReason', value: formData.sellingReason },
      { field: 'name', value: formData.name },
      { field: 'email', value: formData.email },
      { field: 'phone', value: formData.phone },
      { field: 'whatsappEnabled', value: formData.whatsappEnabled },
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
      <section className="py-20">
        <Container>
          <div className="text-center max-w-lg mx-auto">
            <h2 className="text-3xl font-medium tracking-tight mb-4 text-balance">Obrigado!</h2>
            <p className="text-lg leading-relaxed opacity-75">
              Recebemos a sua informação e entraremos em contacto em breve.
            </p>
          </div>
        </Container>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center max-w-lg mx-auto">
            <p className="text-lg leading-relaxed opacity-75">A enviar a sua informação...</p>
          </div>
        </Container>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center max-w-lg mx-auto space-y-6">
            <p className="text-lg leading-relaxed text-red-600">Erro: {error}</p>
            <Button onClick={() => setError(undefined)} size="sm">
              Tentar Novamente
            </Button>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <div className="max-w-2xl mx-auto ps-4 md:ps-6">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-1">
          {[1, 2, 3].map((step) => (
            <motion.div
              key={step}
              className="flex-1 h-0.5 bg-foreground rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: currentStep >= step ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <span className="highlight text-sm">{currentStep} / 3</span>
      </div>

      {/* Step 1: Basic Intent */}
      {currentStep === 1 && (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-sm highlight text-center mb-2">O que o traz aqui hoje?</h2>
          </div>

          <div className="space-y-8">
            <div>
              <label className={labelStyle}>Estou interessado em</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'buying', label: 'Comprar' },
                  { value: 'selling', label: 'Vender' },
                  { value: 'renting', label: 'Arrendar' },
                  { value: 'investing', label: 'Investir' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData({ intent: option.value as Intent })}
                    className={`border border-foreground/20 rounded p-4 text-sm font-medium transition-all duration-300 hover:border-foreground/40 ${
                      formData.intent === option.value
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-transparent'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelStyle}>Tipo de propriedade</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'residential', label: 'Residencial' },
                  { value: 'commercial', label: 'Comercial' },
                  { value: 'land', label: 'Terreno' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData({ propertyType: option.value as PropertyType })}
                    className={`border border-foreground/20 rounded p-4 text-sm font-medium transition-all duration-300 hover:border-foreground/40 ${
                      formData.propertyType === option.value
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-transparent'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelStyle}>Cronograma</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'immediate', label: 'Imediato' },
                  { value: '1-3-months', label: '1-3 meses' },
                  { value: '3-6-months', label: '3-6 meses' },
                  { value: 'exploring', label: 'Apenas explorando' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData({ timeline: option.value as Timeline })}
                    className={`border border-foreground/20 rounded p-4 text-sm font-medium transition-all duration-300 hover:border-foreground/40 ${
                      formData.timeline === option.value
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-transparent'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={nextStep}
              disabled={!formData.intent || !formData.propertyType || !formData.timeline}
              size="sm"
            >
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Qualification */}
      {currentStep === 2 && (
        <div className="space-y-12">
          <div className="text-center">
            <p className="highlight text-sm mb-1 opacity-75">Passo 2</p>
            <h2 className="text-3xl font-medium tracking-tight mb-2 text-balance">
              Fale-nos mais sobre as suas necessidades
            </h2>
            <p className="text-lg leading-relaxed opacity-75 max-w-md mx-auto">
              Isto ajuda-nos a compreender melhor o que procura.
            </p>
          </div>

          <div className="space-y-8">
            {(formData.intent === 'buying' || formData.intent === 'investing') && (
              <>
                <div>
                  <label className="highlight text-sm mb-4 block opacity-75">Orçamento</label>
                  <div className="space-y-3">
                    {[
                      { value: 'under-250k', label: 'Abaixo de €250k' },
                      { value: '250k-500k', label: '€250k - €500k' },
                      { value: '500k-1m', label: '€500k - €1M' },
                      { value: '1m-2.5m', label: '€1M - €2.5M' },
                      { value: 'above-2.5m', label: 'Acima de €2.5M' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData({ budgetRange: option.value as BudgetRange })}
                        className={`w-full border border-foreground/20 rounded p-4 text-sm font-medium text-left transition-all duration-300 hover:border-foreground/40 ${
                          formData.budgetRange === option.value
                            ? 'bg-foreground text-background border-foreground'
                            : 'bg-transparent'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelStyle}>Localizações preferidas</label>
                  <input
                    type="text"
                    placeholder="ex: Lisboa, Porto..."
                    className="w-full bg-transparent border-b border-foreground/20 pb-2 outline-none text-lg focus:border-foreground/60 transition-colors duration-300"
                    value={formData.preferredLocations?.join(', ') || ''}
                    onChange={(e) =>
                      updateFormData({
                        preferredLocations: e.target.value.split(', ').filter(Boolean),
                      })
                    }
                  />
                </div>

                <div>
                  <label className={labelStyle}>Financiamento</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'cash', label: 'Dinheiro' },
                      { value: 'pre-approved', label: 'Pré-aprovado' },
                      { value: 'need-financing', label: 'Preciso financiamento' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData({ financing: option.value as Financing })}
                        className={`border border-foreground/20 rounded p-4 text-sm font-medium transition-all duration-300 hover:border-foreground/40 ${
                          formData.financing === option.value
                            ? 'bg-foreground text-background border-foreground'
                            : 'bg-transparent'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
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
                    className="w-full bg-transparent border-b border-foreground/20 pb-2 outline-none text-lg focus:border-foreground/60 transition-colors duration-300"
                    value={formData.propertyLocation || ''}
                    onChange={(e) => updateFormData({ propertyLocation: e.target.value })}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Tamanho (m²)</label>
                  <input
                    type="text"
                    placeholder="120"
                    className="w-full bg-transparent border-b border-foreground/20 pb-2 outline-none text-lg focus:border-foreground/60 transition-colors duration-300"
                    value={formData.propertySize || ''}
                    onChange={(e) => updateFormData({ propertySize: e.target.value })}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Valor estimado</label>
                  <input
                    type="text"
                    placeholder="€350.000"
                    className="w-full bg-transparent border-b border-foreground/20 pb-2 outline-none text-lg focus:border-foreground/60 transition-colors duration-300"
                    value={formData.estimatedValue || ''}
                    onChange={(e) => updateFormData({ estimatedValue: e.target.value })}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Motivo para vender</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'upgrade', label: 'Melhorar' },
                      { value: 'downsize', label: 'Reduzir' },
                      { value: 'investment', label: 'Investimento' },
                      { value: 'relocation', label: 'Mudança' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          updateFormData({ sellingReason: option.value as SellingReason })
                        }
                        className={`border border-foreground/20 rounded p-4 text-sm font-medium transition-all duration-300 hover:border-foreground/40 ${
                          formData.sellingReason === option.value
                            ? 'bg-foreground text-background border-foreground'
                            : 'bg-transparent'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={prevStep} variant="outline" size="sm">
              Voltar
            </Button>
            <Button onClick={nextStep} size="sm">
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Details */}
      {currentStep === 3 && (
        <div className="space-y-12">
          <div className="text-center">
            <p className="highlight text-sm mb-1 opacity-75">Passo 3</p>
            <h2 className="text-3xl font-medium tracking-tight mb-2 text-balance">
              Como podemos contactá-lo?
            </h2>
            <p className="text-lg leading-relaxed opacity-75 max-w-md mx-auto">
              Só precisamos de alguns detalhes para entrarmos em contacto.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <label className={labelStyle}>Nome completo *</label>
              <input
                type="text"
                placeholder="João Silva"
                className="w-full bg-transparent border-b border-foreground/20 pb-2 outline-none text-lg focus:border-foreground/60 transition-colors duration-300"
                value={formData.name || ''}
                onChange={(e) => updateFormData({ name: e.target.value })}
              />
            </div>

            <div>
              <label className={labelStyle}>Email *</label>
              <input
                type="email"
                placeholder="joao@exemplo.com"
                className="w-full bg-transparent border-b border-foreground/20 pb-2 outline-none text-lg focus:border-foreground/60 transition-colors duration-300"
                value={formData.email || ''}
                onChange={(e) => updateFormData({ email: e.target.value })}
              />
            </div>

            <div>
              <label className={labelStyle}>Telefone</label>
              <input
                type="tel"
                placeholder="+351 912 345 678"
                className="w-full bg-transparent border-b border-foreground/20 pb-2 outline-none text-lg focus:border-foreground/60 transition-colors duration-300"
                value={formData.phone || ''}
                onChange={(e) => updateFormData({ phone: e.target.value })}
              />
              <div className="mt-3">
                <label className={labelStyle}>
                  <input
                    type="checkbox"
                    checked={formData.whatsappEnabled || false}
                    onChange={(e) => updateFormData({ whatsappEnabled: e.target.checked })}
                    className="mr-2"
                  />
                  Este número tem WhatsApp
                </label>
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
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      updateFormData({ preferredContactMethod: option.value as ContactMethod })
                    }
                    className={`border border-foreground/20 rounded p-4 text-sm font-medium transition-all duration-300 hover:border-foreground/40 ${
                      formData.preferredContactMethod === option.value
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-transparent'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelStyle}>Mensagem (opcional)</label>
              <textarea
                placeholder={`Estou interessado em ${formData.intent || 'comprar'} propriedade ${formData.propertyType || 'residencial'}...`}
                className="w-full bg-transparent border border-foreground/20 rounded p-4 outline-none text-sm resize-none h-24 focus:border-foreground/60 transition-colors duration-300"
                value={formData.message || ''}
                onChange={(e) => updateFormData({ message: e.target.value })}
              />
            </div>

            <div>
              <label className={labelStyle}>
                <input
                  type="checkbox"
                  checked={formData.acceptPrivacy || false}
                  onChange={(e) => updateFormData({ acceptPrivacy: e.target.checked })}
                  className="mr-2 mt-0.5"
                />
                <span>
                  Aceito a política de privacidade e concordo em ser contactado sobre a minha
                  consulta *
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={prevStep} variant="outline" size="sm">
              Voltar
            </Button>
            <Button
              onClick={submitForm}
              disabled={!formData.name || !formData.email || !formData.acceptPrivacy}
              size="sm"
            >
              Enviar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MultiStepForm
