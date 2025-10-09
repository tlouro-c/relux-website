'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Info, RotateCcw } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface MortgageCalculatorProps {
  initialHomePrice?: number
  initialDownPayment?: number
  initialDownPaymentPercent?: number
  initialInterestRate?: number
  initialTerm?: string
  initialPropertyTax?: number
  initialHOA?: number
}

export function MortgageCalculator({
  initialHomePrice = 5299000,
  initialDownPayment = 1059800,
  initialDownPaymentPercent = 20,
  initialInterestRate = 8,
  initialTerm = '30',
  initialPropertyTax = 1423,
  initialHOA = 0,
}: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState(initialHomePrice)
  const [downPayment, setDownPayment] = useState(initialDownPayment)
  const [downPaymentPercent, setDownPaymentPercent] = useState(initialDownPaymentPercent)
  const [interestRate, setInterestRate] = useState(initialInterestRate)
  const [term, setTerm] = useState(initialTerm)
  const [propertyTax, setPropertyTax] = useState(initialPropertyTax)
  const [hoa, setHOA] = useState(initialHOA)

  // Calculate mortgage payment
  const calculateMortgage = () => {
    const principal = homePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = Number.parseInt(term) * 12

    if (monthlyRate === 0) {
      return principal / numberOfPayments
    }

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return monthlyPayment
  }

  const principalAndInterest = calculateMortgage()
  const totalMonthlyPayment = principalAndInterest + propertyTax + hoa

  // Update down payment when percentage changes
  const handleDownPaymentPercentChange = (value: string) => {
    const percent = Number.parseFloat(value) || 0
    setDownPaymentPercent(percent)
    setDownPayment((homePrice * percent) / 100)
  }

  // Update percentage when down payment changes
  const handleDownPaymentChange = (value: string) => {
    const payment = Number.parseFloat(value.replace(/,/g, '')) || 0
    setDownPayment(payment)
    setDownPaymentPercent((payment / homePrice) * 100)
  }

  // Update down payment when home price changes
  const handleHomePriceChange = (value: string) => {
    const price = Number.parseFloat(value.replace(/,/g, '')) || 0
    setHomePrice(price)
    setDownPayment((price * downPaymentPercent) / 100)
  }

  const reset = () => {
    setHomePrice(initialHomePrice)
    setDownPayment(initialDownPayment)
    setDownPaymentPercent(initialDownPaymentPercent)
    setInterestRate(initialInterestRate)
    setTerm(initialTerm)
    setPropertyTax(initialPropertyTax)
    setHOA(initialHOA)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  // Calculate percentages for the chart
  const principalPercent = (principalAndInterest / totalMonthlyPayment) * 100
  const taxPercent = (propertyTax / totalMonthlyPayment) * 100
  const hoaPercent = (hoa / totalMonthlyPayment) * 100

  const radius = 120
  const circumference = 2 * Math.PI * radius

  // Calculate angles in degrees for each segment
  const principalAngle = (principalPercent / 100) * 360
  const taxAngle = (taxPercent / 100) * 360
  const hoaAngle = (hoaPercent / 100) * 360

  // Convert angles to arc lengths
  const principalArc = (principalAngle / 360) * circumference
  const taxArc = (taxAngle / 360) * circumference
  const hoaArc = (hoaAngle / 360) * circumference

  return (
    <TooltipProvider>
      <div className="grid gap-12 lg:grid-cols-2 my-20">
        {/* Left Column - Inputs */}
        <div>
          <h1 className="mb-4 font-sans text-4xl font-bold text-foreground lg:text-5xl">
            Calculadora de Crédito Habitação
          </h1>
          <p className="mb-8 text-base leading-relaxed">
            Estime a sua prestação mensal de crédito habitação, incluindo o capital e juros,
            impostos sobre a propriedade e taxas de condomínio. Ajuste os valores para gerar uma
            taxa mais precisa.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Home Price */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Label htmlFor="homePrice" className="font-semibold">
                  Preço da Casa
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>O preço total de compra da casa</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="homePrice"
                type="text"
                value={`$${formatNumber(homePrice)}`}
                onChange={(e) => handleHomePriceChange(e.target.value.replace('$', ''))}
                className="bg-white"
              />
            </div>

            {/* Term */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Label htmlFor="term" className="font-semibold">
                  Prazo
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Duração do empréstimo hipotecário</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select value={term} onValueChange={setTerm}>
                <SelectTrigger id="term" className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 anos fixo</SelectItem>
                  <SelectItem value="20">20 anos fixo</SelectItem>
                  <SelectItem value="30">30 anos fixo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Down Payment - spans 1 column */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Label htmlFor="downPayment" className="font-semibold">
                  Entrada
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>O valor pago antecipadamente pela casa</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-2">
                <Input
                  id="downPayment"
                  type="text"
                  value={`$${formatNumber(downPayment)}`}
                  onChange={(e) => handleDownPaymentChange(e.target.value.replace('$', ''))}
                  className="flex-1 bg-white"
                />
                <div className="relative w-24">
                  <Input
                    type="number"
                    value={downPaymentPercent.toFixed(0)}
                    onChange={(e) => handleDownPaymentPercentChange(e.target.value)}
                    className="bg-white pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
            </div>

            {/* Property Tax */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Label htmlFor="propertyTax" className="font-semibold">
                  IMI
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Valor mensal do imposto sobre a propriedade</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="propertyTax"
                type="text"
                value={`$${formatNumber(propertyTax)}/mês`}
                onChange={(e) =>
                  setPropertyTax(
                    Number.parseFloat(e.target.value.replace('$', '').replace('/mês', '')) || 0,
                  )
                }
                className="bg-white"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Label htmlFor="interestRate" className="font-semibold">
                  Taxa de Juro
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Taxa de juro anual do empréstimo</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative">
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number.parseFloat(e.target.value) || 0)}
                  className="bg-white pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>

            {/* Common Charges or HOA */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Label htmlFor="hoa" className="font-semibold">
                  Condomínio
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Taxas mensais de condomínio</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="hoa"
                type="text"
                value={`$${formatNumber(hoa)}/mês`}
                onChange={(e) =>
                  setHOA(
                    Number.parseFloat(e.target.value.replace('$', '').replace('/mês', '')) || 0,
                  )
                }
                className="bg-white"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={reset}
            className="mt-6 text-[#0a1f5c] hover:text-[#0a1f5c]/80"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Repor
          </Button>
        </div>

        {/* Right Column - Chart and Breakdown */}
        <div className="flex flex-col items-center justify-center">
          {/* Donut Chart */}
          <div className="relative mb-8">
            <svg width="400" height="400" viewBox="0 0 300 300">
              {/* Background circle */}
              <circle cx="150" cy="150" r={radius} fill="none" stroke="#e5e5e5" strokeWidth="60" />

              {/* Principal and Interest segment */}
              <circle
                cx="150"
                cy="150"
                r={radius}
                fill="none"
                stroke="#0a1f5c"
                strokeWidth="60"
                strokeDasharray={`${principalArc} ${circumference}`}
                strokeDashoffset={0}
                transform="rotate(-90 150 150)"
              />

              {/* Property Tax segment */}
              {taxArc > 0 && (
                <circle
                  cx="150"
                  cy="150"
                  r={radius}
                  fill="none"
                  stroke="#c0c0c0"
                  strokeWidth="60"
                  strokeDasharray={`${taxArc} ${circumference}`}
                  strokeDashoffset={-principalArc}
                  transform="rotate(-90 150 150)"
                />
              )}

              {/* HOA segment */}
              {hoaArc > 0 && (
                <circle
                  cx="150"
                  cy="150"
                  r={radius}
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth="60"
                  strokeDasharray={`${hoaArc} ${circumference}`}
                  strokeDashoffset={-(principalArc + taxArc)}
                  transform="rotate(-90 150 150)"
                />
              )}

              <text
                x="150"
                y="135"
                textAnchor="middle"
                className="fill-gray-900 font-sans text-4xl font-bold"
              >
                {formatCurrency(totalMonthlyPayment)}
              </text>
              <text x="150" y="165" textAnchor="middle" className="fill-gray-700 font-sans text-lg">
                A Sua Prestação
              </text>
            </svg>
          </div>

          <div className="w-full max-w-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-foreground" />
                <span className="text-sm">Capital e Juros</span>
              </div>
              <span className="font-semibold">
                {formatCurrency(principalAndInterest)} ({principalPercent.toFixed(0)}%)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#c0c0c0]" />
                <span className="text-sm">IMI</span>
              </div>
              <span className="font-semibold">
                {formatCurrency(propertyTax)} ({taxPercent.toFixed(0)}%)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#e5e5e5]" />
                <span className="text-sm">Condomínio</span>
              </div>
              <span className="font-semibold">
                {formatCurrency(hoa)} ({hoaPercent.toFixed(0)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
