import { FC } from "react";
import Link from "next/link";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import MailIcon from "@/components/ui/MailIcon";
import ArrowLarge from "@/components/ui/ArrowLargeIcon";
import FacebookIcon from "@/components/ui/FacebookIcon";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import InstagramIcon from "@/components/ui/InstangramIcon";
import TelegramIcon from "@/components/ui/TelegramIcon";
import ClipIcon from "@/components/ui/ClipIcon";

import styles from "./contacts.module.scss";

interface IForm {
    email: string,
    name: string,
    telephone: string
};

const Contacts: FC = () => {

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        name: Yup.string().required('Name is required'),
        telephone: Yup.string().min(10, 'At least 10 digits').required('Phone number is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            telephone: '',
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: (values: IForm) => {
            handleSubmit(values);
        }
    });

    const handleSubmit = (values: IForm) => {
        console.log(values)
    };

    return (
        <MainLayout title="Contacts">
            <div className={styles.contacts}>
                <h1>Come closer. Let’s keep in touch ;)</h1>
                <section className={styles.contacts__wrapper}>
                    <h2>Learn more about AIO, visit our social media and feel free to contact us!</h2>
                    <div className={styles.contacts__content}>
                        <div className={styles.contacts__content_left}>

                            <div className={styles.contacts__content_left_single_wrapper}>
                                <div className={styles.contacts__content_left_single}>
                                    <div className={styles.contacts__content_left_single_left}>
                                        <div><MailIcon /></div>
                                        <p>Email</p>
                                    </div>
                                    <div className={styles.contacts__content_left_single_right}>
                                        <div><ClipIcon /></div>
                                        <p>info@aio.house</p>
                                    </div>
                                </div>
                                <div id={styles.separation}><div/></div>
                            </div>
                            
                            <div className={styles.contacts__content_left_single_wrapper}>
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
                                <div id={styles.separation}><div/></div>
                            </div>

                            <div className={styles.contacts__content_left_single_wrapper}>
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
                                <div id={styles.separation}><div/></div>
                            </div>

                            <div className={styles.contacts__content_left_single_wrapper}>                            
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
                                <div id={styles.separation}><div/></div>
                            </div>
                                
                            <div className={styles.contacts__content_left_single_wrapper}>
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
                                <div id={styles.separation}><div/></div>
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
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <input
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.email && formik.errors.email ? styles.inputError : ''}
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Email" 
                                />
                                {formik.errors.email && formik.touched.email && <p className={styles.errorMessage}>{formik.errors.email}</p>}
                            </div> 
                            
                            <div>
                                <input
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.name && formik.errors.name ? styles.inputError : ''}
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    type="text"
                                />
                                {formik.errors.name && formik.touched.name && <p className={styles.errorMessage}>{formik.errors.name}</p>}
                            </div>
                                
                            <div>
                                <input
                                    value={formik.values.telephone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.telephone && formik.errors.telephone ? styles.inputError : ''}
                                    id="telephone"
                                    name="telephone"
                                    placeholder="Phone number"
                                    type="tel"
                                />
                                {formik.errors.telephone && formik.touched.telephone && <p className={styles.errorMessage}>{formik.errors.telephone}</p>}
                            </div>
                            
                            <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                        </form>
                </section>
            </div>
        </MainLayout>
    )
}

export default Contacts;