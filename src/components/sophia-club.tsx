"use client";

import React from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export default function SophiaClub() {
    return (
        <div className="flex flex-col min-h-screen bg-[#E8E3DC] text-[#35483A]">
      <style jsx global>{`
        @media (min-width: 768px) {
          .parallax {
            background-attachment: fixed;
          }
        }
      `}</style>
      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat parallax"
           style={{backgroundImage: "url('/static/images/sophia-club-convocation-2024.png')"}} />
            <div className="relative z-10">
                <header className="px-4 lg:px-6 h-16 flex items-center bg-[#35483A] text-[#E8E3DC]">
                    <Link className="flex items-center justify-center" href="#">
                        <Image
                            src="/static/images/sophia-club-logo.png"
                            alt="Sophia Club Logo"
                            width={40}
                            height={40}
                            className="mr-2"
                        />
                        <span className="text-2xl font-bold">Софія</span>
                    </Link>
                    <nav className="ml-auto flex gap-4 sm:gap-6">
                        <Link className="text-sm font-medium hover:text-[#CF922A] transition-colors" href="#about">
                            Про подію
                        </Link>
                        <Link className="text-sm font-medium hover:text-[#CF922A] transition-colors" href="#schedule">
                            Розклад
                        </Link>
                        <Link className="text-sm font-medium hover:text-[#CF922A] transition-colors" href="#register">
                            Реєстрація
                        </Link>
                    </nav>
                </header>
                <main className="flex-1">
                    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#35483A]/90 text-[#E8E3DC]">
                        <div className="container px-4 md:px-6">
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <Image
                                    src="/static/images/people-thumbs-up.jpg"
                                    alt="Sophia Club Convocation 2024 Banner"
                                    width={600}
                                    height={300}
                                    className="rounded-lg shadow-lg mb-8"
                                />
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                        Конвокація Клубу "Софія" 2024
                                    </h1>
                                    <p className="mx-auto max-w-[700px] text-[#E8E3DC] md:text-xl">
                                        Приєднуйтесь до нас 12 жовтня 2024 року на ВДНГ, павільйон № 4
                                    </p>
                                </div>
                                <div className="space-x-4">
                                    <Link
                                        className="inline-flex h-9 items-center justify-center rounded-md bg-[#CF922A] px-4 py-2 text-sm font-medium text-[#35483A] shadow transition-colors hover:bg-[#E8E3DC] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CF922A] disabled:pointer-events-none disabled:opacity-50"
                                        href="#register"
                                    >
                                        Зареєструватися
                                    </Link>
                                    <Link
                                        className="inline-flex h-9 items-center justify-center rounded-md border border-[#E8E3DC] px-4 py-2 text-sm font-medium text-[#E8E3DC] shadow-sm transition-colors hover:bg-[#E8E3DC] hover:text-[#35483A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8E3DC] disabled:pointer-events-none disabled:opacity-50"
                                        href="#about"
                                    >
                                        Дізнатися більше
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-[#E8E3DC]/90 text-[#35483A]">
                        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center">
                            <div className="md:w-1/2 md:pr-8">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Про
                                    подію</h2>
                                <p className="mt-4 text-[#35483A]">
                                    Конвокація Клубу "Софія" - це щорічна подія, яка збирає найкращих мислителів та
                                    інноваторів. Приєднуйтесь до нас для обміну ідеями, нетворкінгу та натхнення.
                                </p>
                            </div>
                            <div className="md:w-1/2 mt-6 md:mt-0">
                                <Image
                                    src="/static/images/previous-event.jpg"
                                    alt="Previous Sophia Club Event"
                                    width={600}
                                    height={400}
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </section>
                    <section id="schedule" className="w-full py-12 md:py-24 lg:py-32 bg-[#35483A]/90 text-[#E8E3DC]">
                        <div className="container px-4 md:px-6">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Розклад</h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <div className="rounded-lg border border-[#E8E3DC] bg-[#35483A] shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">09:30 - 10:30</h3>
                                        <p className="text-[#E8E3DC]">Вітальна кава</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#E8E3DC] bg-[#35483A] shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">10:30 - 11:40</h3>
                                        <p className="text-[#E8E3DC]">Вітальна частина</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#E8E3DC] bg-[#35483A] shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">11:40 - 13:00</h3>
                                        <p className="text-[#E8E3DC]">Панельна дискусія "Що в нас є сьогодні для України
                                            нової якості завтра?"</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#E8E3DC] bg-[#35483A] shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">13:00 - 14:00</h3>
                                        <p className="text-[#E8E3DC]">Обід</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#E8E3DC] bg-[#35483A] shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">14:00 - 14:45</h3>
                                        <p className="text-[#E8E3DC]">Звіт клубу</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#E8E3DC] bg-[#35483A] shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">14:45 - 16:30</h3>
                                        <p className="text-[#E8E3DC]">Рефлексія-нетворкінг</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#E8E3DC] bg-[#35483A] shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">16:30 - 18:30</h3>
                                        <p className="text-[#E8E3DC]">Закриття офіційної частини</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#E8E3DC] bg-[#35483A] shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">18:30 - 19:30</h3>
                                        <p className="text-[#E8E3DC]">Вечеря</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#E8E3DC] bg-[#35483A] shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">19:30 - 21:00</h3>
                                        <p className="text-[#E8E3DC]">Акустичний вечір з Пташником та Ігриком</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="register" className="w-full py-12 md:py-24 lg:py-32 bg-[#E8E3DC]/90 text-[#35483A]">
                        <div className="container px-4 md:px-6">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Реєстрація</h2>
                            <form className="space-y-4 max-w-md mx-auto">
                                <Input placeholder="Ім'я та прізвище" className="bg-white text-[#35483A]"/>
                                <Input type="email" placeholder="Електронна пошта" className="bg-white text-[#35483A]"/>
                                <select
                                    className="w-full h-10 px-3 rounded-md border border-[#35483A] bg-white text-[#35483A]">
                                    <option value="">Виберіть внесок</option>
                                    <option value="700">700 грн</option>
                                    <option value="800">800 грн</option>
                                    <option value="350">350 грн (для військових)</option>
                                </select>
                                <Button
                                    className="w-full bg-[#CF922A] text-[#35483A] hover:bg-[#35483A] hover:text-[#E8E3DC]">ЗАРЕЄСТРУВАТИСЬ!</Button>
                            </form>
                            <p className="mt-4 text-sm text-center text-[#35483A]">
                                Картка для переказу коштів: 5375 4141 1723 2115
                            </p>
                        </div>
                    </section>
                </main>
                <footer
                    className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#35483A] bg-[#E8E3DC]/90 text-[#35483A]">
                    <p className="text-xs">© 2024 Клуб "Софія". Всі права захищені.</p>
                    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                        <Link className="text-xs hover:text-[#CF922A] transition-colors" href="#">
                            Політика конфіденційності
                        </Link>
                        <Link className="text-xs hover:text-[#CF922A] transition-colors" href="#">
                            Умови використання
                        </Link>
                    </nav>
                </footer>
            </div>
        </div>
    )
}