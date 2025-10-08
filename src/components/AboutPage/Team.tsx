import React from 'react'
import Container from '../Container'
import Link from 'next/link'
import Image from 'next/image'
import { fetchTeam } from '@/collections/Consultants/utils/dataFetching'

export default async function Team() {
  const team = await fetchTeam()

  return (
    <section className="relative">
      <div className="h-[calc(100svh-var(--header-height))] max-w-7xl mx-auto sticky top-[var(--header-height)] overflow-hidden">
        <Image
          src="/images/about/equipa-relux.png"
          alt="Equipa Relux"
          height={0}
          width={0}
          sizes="100vw"
          className="w-full h-full object-cover mix-blend-screen"
        />
      </div>
      <div className="bg-secondary rounded-t-2xl overflow-hidden w-full z-10 relative py-10 min-h-[calc(100svh-var(--header-height))]">
        <Container>
          <header className="mb-16 flex flex-col items-center md:items-start text-foreground">
            <h2 className="section-badge text-accentn">Equipa</h2>
            <p className="section-title">Conheça a Nossa Equipa</p>
          </header>
          <div className="relative mb-20 md:mb-40">
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full gap-6 text-foreground">
              {team.docs
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((member) => (
                  <Link key={member.slug} className="group" href={`/consultor/${member.slug}`}>
                    <div className="overflow-hidden rounded-xl relative bg-foreground">
                      <Image
                        src={member.imageUrl || '/images/consultants/default.png'}
                        alt={member.name}
                        height={0}
                        width={0}
                        sizes="50vw"
                        className="object-cover w-full h-auto aspect-[4/5] group-hover:border-1 border-accent group-hover:scale-105 group-hover:blur-sm group-hover:brightness-75 transition-all duration-300"
                      />
                      <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-lg highlight text-background opacity-0 group-hover:opacity-100">
                        Saber mais
                      </span>
                    </div>
                    <div className="flex flex-col transition-colors duration-300 py-2">
                      <span className="text-xl font-semibold tracking-tighter  !text-nowrap">
                        {member.name}
                      </span>
                      <span className="text-sm tracking-tight pb-0.5 ">{member.role}</span>
                      {member.phone && (
                        <span className="text-sm tracking-tight pb-0.5 ">{member.phone}</span>
                      )}
                      {member.email && (
                        <span className="text-sm tracking-tight pb-0.5 ">{member.email}</span>
                      )}
                    </div>
                  </Link>
                ))}
            </ul>
          </div>
        </Container>
      </div>
    </section>
  )
}
