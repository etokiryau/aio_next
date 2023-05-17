import { FC } from "react";
import { Formik, Field, Form } from 'formik';

import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import MailIcon from "@/components/ui/MailIcon";
import ArrowLarge from "@/components/ui/ArrowLargeIcon";
import FacebookIcon from "@/components/ui/FacebookIcon";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import InstagramIcon from "@/components/ui/InstangramIcon";

import styles from "./contacts.module.scss";
import TelegramIcon from "@/components/ui/TelegramIcon";
import Link from "next/link";

const Contacts: FC = () => {

    return (
        <MainLayout title="Contacts">
            <div className={styles.contacts}>
                <h1>Come closer. Let’s keep in touch ;)</h1>
                <section className={styles.contacts__wrapper}>
                    <h2>Learn more about AIO, visit our social media and feel free to contact us!</h2>
                    <div className={styles.contacts__content}>
                        <div className={styles.contacts__content_left}>
                            <div className={styles.contacts__content_left_single}>
                                <div className={styles.contacts__content_left_single_left}>
                                    <div><MailIcon /></div>
                                    <p>Email</p>
                                </div>
                                <div className={styles.contacts__content_left_single_right}>
                                    <div><ArrowLarge /></div>
                                    <p>info@aio.house</p>
                                </div>
                            </div>

                            <div className={styles.contacts__content_left_single}>
                                <div className={styles.contacts__content_left_single_left}>
                                    <div><FacebookIcon /></div>
                                    <p>Facebook</p>
                                </div>
                                <div className={styles.contacts__content_left_single_right}>
                                    <ArrowLarge />
                                    <p>info@aio.house</p>
                                </div>
                            </div>

                            <div className={styles.contacts__content_left_single}>
                                <div className={styles.contacts__content_left_single_left}>
                                    <div><LinkedInIcon /></div>
                                    <p>LinkedIn</p>
                                </div>
                                <div className={styles.contacts__content_left_single_right}>
                                    <ArrowLarge />
                                    <p>info@aio.house</p>
                                </div>
                            </div>

                            <div className={styles.contacts__content_left_single}>
                                <div className={styles.contacts__content_left_single_left}>
                                    <div><InstagramIcon /></div>
                                    <p>Instagram</p>
                                </div>
                                <div className={styles.contacts__content_left_single_right}>
                                    <ArrowLarge />
                                    <p>info@aio.house</p>
                                </div>
                            </div>

                            <div className={styles.contacts__content_left_single}>
                                <div className={styles.contacts__content_left_single_left}>
                                    <div><TelegramIcon /></div>
                                    <p>Telegram</p>
                                </div>
                                <div className={styles.contacts__content_left_single_right}>
                                    <ArrowLarge />
                                    <p>info@aio.house</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.contacts__content_right}>
                            <div className={styles.contacts__content_right_wrapper}>
                                <div className={styles.contacts__content_right_address}>
                                    <p>Rua de Santos Pousada 640, Porto 4000, Portugal</p>
                                </div>
                                <div className={styles.contacts__content_right_links}>
                                    <Link href="/questiones" className={styles.contacts__content_right_links_single}>
                                        <p>FAQ</p>
                                        <ArrowLarge />
                                    </Link>
                                    <Link href="/policy" className={styles.contacts__content_right_links_single}>
                                        <p>Privacy policy</p>
                                        <ArrowLarge />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.contacts__form}>
                    <p>Want us to contact you? Fill the form below</p>
                    <div>
                    <Formik
                            initialValues={{
                                email: '',
                                name: '',
                                telephone: '',
                            }}
                            // validate={values => {
                            //     const errors = {};
                            //     if (!values.email) {
                            //     errors.email = 'Email is required';
                            //     }
                            //     if (!values.name) {
                            //     errors.password = 'Password is required';
                            //     }
                            //     if (!values.telephone) {
                            //         errors.telephone = 'Password is required';
                            //     }
                            //     return errors;
                            // }}
                            onSubmit={() => {}}
                        >
                            <Form className="contacts__form-wrapper">   
                                <Field 
                                    className="contacts__form-input" 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Your email" />
                            
                                <Field
                                    className="contacts__form-input"
                                    id="name"
                                    name="name"
                                    placeholder="Your name"
                                    type="text"
                                />        

                                <Field
                                    className="contacts__form-input"
                                    id="telephone"
                                    name="telephone"
                                    placeholder="Your telephone"
                                    type="tel"
                                />
                            
                                <div className="contacts__form-button">
                                    <button type="submit" disabled={false}>Send</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </section>
            </div>
        </MainLayout>
    )
}

export default Contacts;