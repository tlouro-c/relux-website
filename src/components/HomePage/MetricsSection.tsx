import React from 'react'
import Container from '../Container'
import Image from 'next/image'

export default function MetricsSection() {
  return (
    <section className="py-20">
      <Container>
        <h2 className="sr-only">Métricas</h2>

        <div className="grid grid-cols-3 gap-4 mx-auto w-fit">
          <MetricCard
            value="70+"
            description="Projetos Concluídos"
            supplementaryText="Comprovado por clientes satisfeitos"
          />
          <div className="flex items-center">
            <TeamMemberCircle imageSrc="/images/team/bruno.png" name="Bruno" index={0} />
            <TeamMemberCircle imageSrc="/images/team/francisco.png" name="Francisco" index={1} />
            <TeamMemberCircle imageSrc="/images/team/soraia.png" name="Soraia" index={2} />
          </div>
          <MetricCard
            value="100%"
            description="Satisfação do Cliente"
            supplementaryText="Feedback positivo em todas as avaliações"
          />
        </div>
      </Container>
    </section>
  )
}

function TeamMemberCircle({
  imageSrc,
  name,
  index,
}: {
  imageSrc: string
  name: string
  index: number
}) {
  return (
    <div
      className={`w-24 h-24 rounded-full overflow-hidden ${index > 0 ? '-ml-4' : ''} border-2 border-background`}
    >
      <Image
        width={96}
        height={96}
        src={imageSrc}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

function MetricCard({
  value,
  description,
  supplementaryText,
}: {
  value?: string
  description?: string
  supplementaryText?: string
}) {
  return (
    <div className="w-fit">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-7xl highlight line-split-animation">{value}</h3>
        <p className="line-split-animation text-2xl text-balance font-semibold max-w-[150px] leading-tight">
          {description}
        </p>
      </div>
      <p className="text-sm line-split-animation">{supplementaryText}</p>
    </div>
  )
}
