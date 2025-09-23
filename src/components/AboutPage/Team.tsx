'use client'

import React from 'react'
import Container from '../Container'
import TeamClient from './TeamClient'

export default function Team() {
  return (
    <section className="pt-20">
      <Container>
        <header className="mb-16 flex flex-col items-center md:items-start">
          <h2 className="section-badge text-accent line-split-animation">Equipa</h2>
          <p className="section-title line-split-animation">Conheça a Nossa Equipa</p>
        </header>
        <TeamClient />
      </Container>
    </section>
  )
}
