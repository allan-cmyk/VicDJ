import { featuredClients } from "@/data/clients"

/** Still row of the best-known clients right under the hero. The full scrolling list stays further down. */
export function ClientRow() {
  return (
    <section aria-label="Selected clients" className="border-y border-ivory/8 bg-ink">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:gap-10 md:px-10 lg:px-14">
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.26em] text-champagne/80">Trusted by</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 md:gap-x-8">
          {featuredClients.map((name) => (
            <li key={name} className="font-display text-[15px] text-ivory/75 md:text-base">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
