import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useTypedSelector } from "@/hooks/useReduxHooks";

import { selectUserPreferences } from "@/components/userPreferences/userPreferencesSlice";
import { useAuth } from "@/hooks/useAuth";
import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import { languagesData } from "@/utillis/preferenceData";

import styles from "./purchase.module.scss";
import LanguageIcon from "@/components/ui/LanguageIcon";
import LocationMarkerIcon from "@/components/ui/LocationMarkerIcon";

interface ICardData {
    cardNumber: string,
    cardName: string,
    expiredPeriod: string,
    cvv: string
};

const Purchase: FC= () => {
    const { email } = useAuth();
    const { location, currency, documentationLanguage } = useTypedSelector(selectUserPreferences);
    const router = useRouter();

    const validationSchema = Yup.object({
        cardNumber: Yup.string().min(25, 'At least 16 digits').required('Card number is required'),
        cardName: Yup.string().required('Card name is required').matches(
            /^[a-zA-Z]+\s[a-zA-Z]+$/,
            'Card name should be two words separated by a space'
        ),
        cvv: Yup.string().min(3, 'At least 3 digits').required('CVV code is required'),
        expiredPeriod: Yup.string().min(9, 'Invalid format').required('Expired period is required')
    });

    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            cardName: '',
            expiredPeriod: '',
            cvv: ''
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: (values: ICardData) => {
            handleSubmit(values);
        }
    });

    const handleSubmit = async (values: ICardData): Promise<void> => {
        console.log(values);
        await new Promise(resolve => {
            setTimeout(() => resolve(router.push('/dashboard')), 4000)
        })
    };

    const handleBlurName = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const value: string = e.target.value.trim();
        await formik.setFieldValue('cardName', value)
        formik.handleBlur(e)
    };
    
    const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let value = e.target.value;
        value = value.replace(/-/g, '').replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 - ');

        if (value.length > 25) {
            value = `${value.slice(0, 25)}`;
        }

        formik.setFieldValue('cardNumber', value);
    };

    const formatExpiredPeriod = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');

        if (value.length > 2) {
            value = `${value.slice(0, 2)} / ${value.slice(2)}`;
        }

        if (value.length > 9) {
            value = `${value.slice(0, 9)}`;
        }

        formik.setFieldValue('expiredPeriod', value);
    };

    const formatCvvCode = (e: React.ChangeEvent<HTMLInputElement>): void => { 
        let value = e.target.value;
        if (value.length > 3) {
            value = `${value.slice(0, 3)}`;
        }
        formik.setFieldValue('cvv', value);
    };

    return (
        <MainLayout title="Purchase" footer={false}>
            <div className={styles.purchase}>
                <div className={styles.purchase__information}>
                    <div className={styles.purchase__information_contact}>
                        <h3>Contact Information</h3>
                        <div className={styles.purchase__information_contact_wrapper}>
                            <div className={styles.purchase__information_contact_single}>
                                <p id={styles.contactTitle}>Email</p>
                                <p id={styles.contactValue}>{email}</p>
                            </div>
                            <div className={styles.purchase__information_contact_single}>
                                <p>Region (city)</p>
                                <p id={styles.contactValue}>{location}</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit} className={styles.purchase__information_payment}>
                        <h3>Payment information</h3>
                        <div className={styles.purchase__information_payment_wrapper}>
                            <div className={styles.purchase__information_payment_single}>
                                <label>Card number</label>
                                <input id="cardNumber" name="cardNumber"
                                    className={formik.touched.cardNumber && formik.errors.cardNumber ? styles.inputError : ''}
                                    value={formik.values.cardNumber} onChange={formatCardNumber} onBlur={formik.handleBlur}
                                    type="text" placeholder="0000 - 0000 - 0000 - 0000" 
                                />
                            </div>
                            <div className={styles.purchase__information_payment_single}>
                                <label>Card name</label>
                                <input id={styles.cardName} name="cardName"
                                    className={formik.touched.cardName && formik.errors.cardName ? styles.inputError : ''}
                                    value={formik.values.cardName} onChange={formik.handleChange} onBlur={handleBlurName}
                                    type="text" placeholder="NAME SURNAME" 
                                />
                            </div>
                            <div className={styles.purchase__information_payment_single_wrapper}>
                                <div className={styles.purchase__information_payment_single}>
                                    <label>Expired period</label>
                                    <input id="expiredPeriod" name="expiredPeriod"
                                        className={formik.touched.expiredPeriod && formik.errors.expiredPeriod ? styles.inputError : ''}
                                        value={formik.values.expiredPeriod} onChange={formatExpiredPeriod} onBlur={formik.handleBlur}
                                        type="text" placeholder="mm / yyyy" 
                                    />
                                </div>
                                <div className={styles.purchase__information_payment_single}>
                                    <label>CVV code</label>
                                    <input id="cvv" name="cvv"
                                        className={formik.touched.cvv && formik.errors.cvv ? styles.inputError : ''}
                                        value={formik.values.cvv} onChange={formatCvvCode} onBlur={formik.handleBlur}
                                        type="number" placeholder="CVV" 
                                    />
                                </div>
                            </div>
                            <div className={styles.purchase__information_payment_submit}>
                                <button disabled={!formik.isValid || formik.isSubmitting} type="submit">Finish purchase</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={styles.purchase__preview}>
                    <div className={styles.purchase__preview_wrapper}>
                        <section>
                            <div className={styles.purchase__preview_information}>
                                <div className={styles.purchase__preview_information_left}>
                                    <div className={styles.purchase__preview_information_left_title}>
                                        <h2>Project A</h2>
                                        <p>Short description</p>
                                    </div>
                                    <div className={styles.purchase__preview_information_left_preferences}>
                                        <div>
                                            <LanguageIcon />
                                            <p>{languagesData[documentationLanguage].title}</p>
                                        </div>
                                        <div>
                                            <LocationMarkerIcon />
                                            <p>{location}</p>
                                        </div>
                                    </div>
                                </div>
                                <Image src="/project61.jpg" alt="render" width={180} height={120}  />
                            </div>
                            <div className={styles.purchase__preview_preliminaryCost}>
                                <p>Project cost</p>
                                <p>3990 {currency}</p>
                            </div>
                        </section>
                        <section className={styles.purchase__preview_cost}>
                            <p>Total: 3900 {currency}</p>
                            <p>Including 13% taxes</p>
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Purchase;