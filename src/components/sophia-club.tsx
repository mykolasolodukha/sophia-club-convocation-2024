'use client'

import React, {Suspense, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useToast} from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

function InnerSophiaClub() {
    const {toast} = useToast();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        graduation_city: '',
        graduation_year: '',
        comments: '',
        payment_option_chosen: '',
    });

    const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
    const [portraitPhoto, setPortraitPhoto] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({...prev, payment_option_chosen: value}));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate all required fields
        const requiredFields = ['first_name', 'last_name', 'phone_number', 'email', 'graduation_city', 'graduation_year', 'payment_option_chosen']
        const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData])

        if (emptyFields.length > 0) {
            toast({
                title: "Помилка",
                description: `Будь ласка, заповніть всі обов'язкові поля: ${emptyFields.join(', ')}`,
                variant: "destructive",
            })
            return
        }

        if (!paymentScreenshot) {
            toast({
                title: "Помилка",
                description: "Будь ласка, завантаж скріншот підтвердження оплати.",
                variant: "destructive",
            })
            return
        }

        if (!portraitPhoto) {
            toast({
                title: "Помилка",
                description: "Будь ласка, завантаж портретне фото.",
                variant: "destructive",
            })
            return
        }

        try {
            const formDataToSubmit = new FormData()

            // Append text fields
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSubmit.append(key, value)
            })

            // Append files
            formDataToSubmit.append('payment_screenshot', paymentScreenshot)
            formDataToSubmit.append('portrait_photo', portraitPhoto)

            // Create the record with all data including files
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const createdRecord = await pb.collection('registrations').create(formDataToSubmit);

            toast({
                title: "Успіх!",
                description: "Реєстрація успішна!",
            });

            // Reset form after successful submission
            setFormData({
                first_name: '',
                last_name: '',
                phone_number: '',
                email: '',
                graduation_city: '',
                graduation_year: '',
                comments: '',
                payment_option_chosen: '',
            });
            setPaymentScreenshot(null);
            setPortraitPhoto(null);
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                title: "Помилка",
                description: "Помилка при реєстрації. Будь ласка, спробуйте ще раз.",
                variant: "destructive",
            });
        }
    };

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
                 style={{backgroundImage: "url('/static/images/sophia-club-convocation-2024.png')"}}/>
            <div className="relative z-10">
                <header className="px-4 lg:px-6 h-16 flex items-center justify-center bg-[#35483A] text-[#E8E3DC]">
                    <div className="container mx-auto flex items-center justify-between">
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
                        <nav className="flex gap-4 sm:gap-6">
                            <Link className="text-sm font-medium hover:text-[#CF922A] transition-colors" href="#about">
                                Про подію
                            </Link>
                            <Link className="text-sm font-medium hover:text-[#CF922A] transition-colors"
                                  href="#schedule">
                                Розклад
                            </Link>
                            <Link className="text-sm font-medium hover:text-[#CF922A] transition-colors"
                                  href="#register">
                                Реєстрація
                            </Link>
                        </nav>
                    </div>
                </header>
                <main className="flex-1">
                    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#35483A]/90 text-[#E8E3DC]">
                        <div className="container mx-auto px-4 md:px-6">
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
                                        Побачимось з тобою 12 жовтня на ВДНГ, павільйон № 4 💚
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
                        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
                            <div className="md:w-1/2 md:pr-8">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Про
                                    подію</h2>
                                <p className="mt-4 text-[#35483A]">
                                    Конвокація - головна щорічна подія Клубу, де відбувається посвята нових членів
                                    клубу.
                                    Конвокація 2024 буде проходити під гаслом "Зміна історій" - особисті історії членів
                                    Клубу перетинаються задля того, щоб творити історію України та творити світ кращим.
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
                        <div className="container mx-auto px-4 md:px-6">
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
                                        <h3 className="text-xl font-bold">14:00 - 15:30</h3>
                                        <p className="text-[#E8E3DC]">Нетворкінг-рефлексія</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#E8E3DC] bg-[#35483A] shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">15:45 - 16:10</h3>
                                        <p className="text-[#E8E3DC]">Звіт клубу</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#E8E3DC] bg-[#35483A] shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">16:10 - 17:10</h3>
                                        <p className="text-[#E8E3DC]">Аукціон</p>
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#E8E3DC] bg-[#35483A] shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">17:10 - 18:10</h3>
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
                        <div className="container mx-auto px-4 md:px-6">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Реєстрація</h2>
                            <Card className="mb-8">
                                <CardHeader>
                                    <CardTitle>Інструкції</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ol className="list-decimal list-inside space-y-4">
                                        <li>Знайди свою найкращу портретну фотографію з часів твого навчання в
                                            Академії/УАЛ.
                                        </li>
                                        <li>Обери опцію долучення (вкладку):</li>
                                        <li>Надішли відповідну суму на картку: 5375 4141 1723 2115</li>
                                        <li>Вкажи своє імʼя, прізвище, номер телефону, email, осередок та рік випуску
                                        </li>
                                        <li className="flex items-center">
                                            До зустрічі 12-го жовтня. Не забудь спільнотно-зелений колір в одязі 😘
                                        </li>
                                    </ol>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Форма реєстрації</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-4" onSubmit={handleSubmit}>
                                        <Select name="payment_option_chosen" onValueChange={handleSelectChange}
                                                value={formData.payment_option_chosen}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Твоя вкладка"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="800_UAH">800 грн</SelectItem>
                                                <SelectItem value="700_UAH">700 грн</SelectItem>
                                                <SelectItem value="350_UAH">350 грн (для військових)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                name="first_name"
                                                value={formData.first_name}
                                                onChange={handleInputChange}
                                                placeholder="Ім'я"
                                                className="bg-white text-[#35483A]"
                                                required
                                            />
                                            <Input
                                                name="last_name"
                                                value={formData.last_name}
                                                onChange={handleInputChange}
                                                placeholder="Прізвище"
                                                className="bg-white text-[#35483A]"
                                                required
                                            />
                                        </div>
                                        <Input
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleInputChange}
                                            type="tel"
                                            placeholder="Номер телефону"
                                            className="bg-white text-[#35483A]"
                                            required
                                        />
                                        <Input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            type="email"
                                            placeholder="Email"
                                            className="bg-white text-[#35483A]"
                                            required
                                        />
                                        <Input
                                            name="graduation_city"
                                            value={formData.graduation_city}
                                            onChange={handleInputChange}
                                            placeholder="Осередок"
                                            className="bg-white text-[#35483A]"
                                            required
                                        />
                                        <Input
                                            name="graduation_year"
                                            value={formData.graduation_year}
                                            onChange={handleInputChange}
                                            type="number"
                                            placeholder="Рік випуску"
                                            className="bg-white text-[#35483A]"
                                            required
                                        />
                                        <Textarea
                                            name="comments"
                                            value={formData.comments}
                                            onChange={handleInputChange}
                                            placeholder="Додаткова інформація"
                                            className="bg-white text-[#35483A]"/>
                                        <div className="space-y-2">
                                            <Label htmlFor="payment-screenshot"
                                                   className="text-sm font-medium text-[#35483A]">
                                                Скріншот підтвердження оплати (обов'язково)
                                            </Label>
                                            <div className="flex items-center">
                                                <Input
                                                    id="payment-screenshot"
                                                    name="payment_screenshot"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, setPaymentScreenshot)}
                                                    className="hidden"
                                                />
                                                <Label
                                                    htmlFor="payment-screenshot"
                                                    className="cursor-pointer bg-[#CF922A] text-[#35483A] hover:bg-[#35483A] hover:text-[#E8E3DC] px-4 py-2 rounded-md text-sm font-semibold transition-colors"
                                                >
                                                    Обрати файл
                                                </Label>
                                                <span className="ml-3 text-sm text-[#35483A]">
                                                  {paymentScreenshot ? paymentScreenshot.name : 'Файл не обрано'}
                                              </span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="portrait-photo"
                                                   className="text-sm font-medium text-[#35483A]">
                                                Портретне фото
                                            </Label>
                                            <div className="flex items-center">
                                                <Input
                                                    id="portrait-photo"
                                                    name="portrait_photo"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, setPortraitPhoto)}
                                                    className="hidden"
                                                />
                                                <Label
                                                    htmlFor="portrait-photo"
                                                    className="cursor-pointer bg-[#CF922A] text-[#35483A] hover:bg-[#35483A] hover:text-[#E8E3DC] px-4 py-2 rounded-md text-sm font-semibold transition-colors"
                                                >
                                                    Обрати файл
                                                </Label>
                                                <span className="ml-3 text-sm text-[#35483A]">
                                                  {portraitPhoto ? portraitPhoto.name : 'Файл не обрано'}
                                              </span>
                                            </div>
                                        </div>
                                        <Button type="submit"
                                                className="w-full bg-[#CF922A] text-[#35483A] hover:bg-[#35483A] hover:text-[#E8E3DC]">
                                            ЗАРЕЄСТРУВАТИСЬ!
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </main>
                <footer
                    className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#35483A] bg-[#E8E3DC]/90 text-[#35483A]">
                    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-xs">© 2024 Клуб "Софія". Created with ❤️ by Mykola Solodukha, Vlada Bilyk,
                            Arsen Shumeiko, and Daryna Klushyna.</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}


export default function SophiaClub() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <InnerSophiaClub/>
            </Suspense>
        </>
    )
}