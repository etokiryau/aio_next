import { FC, useRef, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";

import { ISingleProject } from "@/interfaces/projects.interface";
import GarbageIcon from "../ui/_icons/GarbageIcon";
import AdminViewAdding from "../adminViewAdding/AdminViewAdding";

import styles from "./projectData.module.scss";

interface IProps {
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    data: ISingleProject
};

const ProjectData: FC<IProps> = ({ state, data }) => {
    const [isOpened, setIsOpened] = state;
    const popupRef = useRef<HTMLDivElement>(null);
    const rendersInputRef = useRef<HTMLInputElement>(null);
    const { previewSrc, name, totalArea, height, houseDimensions, cost, reducedCost, roofType, floorNumber, id } = data;
    const renders = [previewSrc, previewSrc, previewSrc, previewSrc, previewSrc];
    const [rendersState, setRendersState] = useState(renders);
    const views = [{src: previewSrc, title: 'Facade 1'}, {src: previewSrc, title: 'Facade 2'}, {src: previewSrc, title: 'Facade 3'}, {src: previewSrc, title: 'Facade 4'}, {src: previewSrc, title: 'Facade %'}]
    const [viewsState, setViewsState] = useState(views);
    const [isAddingView, setIsAddingView] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: data ? name : '',
            id: data ? id : '',
            previewSrc: data ? previewSrc :  '',
            totalArea: data ? totalArea : 0,
            height: data ? height : 0,
            houseDimensions: data ? houseDimensions :  [0, 0],
            cost: data ? cost :  0,
            reducedCost: data ? reducedCost :  0,
            floorNumber: data ? floorNumber :  1,
            roofType: data ? roofType :  '',
            locations: []
		},
		onSubmit: (values: ISingleProject) => {
			handleSubmit(values);
		}
	});

    const handleSubmit = (values: ISingleProject) => {

    };

    const togglePopup = (event: React.MouseEvent<HTMLDivElement>) => {
        event?.target === popupRef.current && setIsOpened(prev => !prev);
    };

    const handleImageDelete = (type: string, order: number): void => {
        if (type === 'renders') {
            const newArray = rendersState.filter((_, i) => order !== i);
            setRendersState(newArray);
        } else {
            const newArray = viewsState.filter((_, i) => order !== i);
            setViewsState(newArray);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;

        if (files) {
            const newRenders = Array.from(files)

            newRenders.forEach((file) => {
                const reader = new FileReader();
          
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    const imageSrc = e.target?.result as string;
                    setRendersState((prev) => [...prev, imageSrc]);
                };
          
                reader.readAsDataURL(file);
            });
        }
    };

    const handleDimensionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLElement;
        const type = target.getAttribute('data-type');
        type === 'first' 
            ? formik.setFieldValue('houseDimensions', [e.target.value, formik.values.houseDimensions[1]])
            : formik.setFieldValue('houseDimensions', [formik.values.houseDimensions[0], e.target.value])
    };

    const rendersContent: JSX.Element[] = rendersState.map((item, i) => {
        return (
            <div key={i} className={styles.popup__content_renders_content_single}>
                <div onClick={() => handleImageDelete('renders', i)} className={styles.popup__content_renders_content_single_delete}>
                    <GarbageIcon />
                </div>
                <Image src={item} alt="render" width={320} height={620} />
            </div>
        )
    });

    const viewsContent: JSX.Element[] = viewsState.map((item, i) => {
        return (
            <div key={i} className={styles.popup__content_views_content_single}>
                <div onClick={() => handleImageDelete('views', i)} className={styles.popup__content_views_content_single_delete}>
                    <GarbageIcon />
                </div>
                <Image src={item.src} alt="render" width={320} height={620} />
                <p>{item.title}</p>
            </div>
        )
    });

    const handleAddView = (view: {src: string, title: string}): void => {
        setViewsState(prev => [...prev, view])
    };

    return (
        <div onClick={togglePopup} ref={popupRef} className={`${styles.popup} ${isOpened ? styles.active : ''}`}>
            <form className={styles.popup__content}>
                <div className={styles.popup__content_header}>
                    <p>Project data</p>
                    <div className={styles.popup__content_header_buttons}>
                        <button type="button">Submit</button>
                        <button onClick={() => setIsOpened(false)} type="button">Cancel</button>
                    </div>
                </div>
                <div className={styles.popup__content_main}>
                    <div className={styles.popup__content_main_block}>
                        <div className={styles.popup__content_main_block_single}>
                            <p>Name</p>
                            <input value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Fill name"
                            />
                        </div>
                        <div className={styles.popup__content_main_block_single}>
                            <p>Area</p>
                            <input value={formik.values.totalArea}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="number"
                                id="totalArea"
                                name="totalArea"
                                placeholder="Fill area"
                            />
                        </div>
                    </div>
                    <div className={styles.popup__content_main_block}>
                        <div className={styles.popup__content_main_block_single}>
                            <p>Height</p>
                            <input value={formik.values.height}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="number"
                                id="height"
                                name="height"
                                placeholder="Fill height"
                            />
                        </div>
                        <div className={styles.popup__content_main_block_single}>
                            <p>Dimesions</p>
                            <input value={formik.values.houseDimensions[0]}
                                onChange={handleDimensionsChange}
                                data-type="first"
                                type="number"
                                id="totalArea"
                                name="totalArea"
                                placeholder="Fill first dimension"
                            />
                            <input value={formik.values.houseDimensions[1]}
                                onChange={handleDimensionsChange}
                                data-type="second"
                                type="number"
                                id="houseDimensions"
                                name="houseDimensions"
                                placeholder="Fill second dimension"
                            />
                        </div>
                    </div>
                    <div className={styles.popup__content_main_block}>
                        <div className={styles.popup__content_main_block_single}>
                            <p>Roof</p>
                            <input value={formik.values.roofType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                id="roofType"
                                name="roofType"
                                placeholder="Fill roof type"
                            />
                        </div>
                        <div className={styles.popup__content_main_block_single}>
                            <p>Floors</p>
                            <input value={formik.values.floorNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="number"
                                id="floorNumber"
                                name="floorNumber"
                                placeholder="Fill number of floors"
                            />
                        </div>
                    </div>
                    <div className={styles.popup__content_main_block}>
                        <div className={styles.popup__content_main_block_single}>
                            <p>Cost</p>
                            <input value={formik.values.cost}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="number"
                                id="cost"
                                name="cost"
                                placeholder="Fill cost"
                            />
                        </div>
                        <div className={styles.popup__content_main_block_single}>
                            <p>Reduced cost</p>
                            <input value={formik.values.reducedCost || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="number"
                                id="reducedCost"
                                name="reducedCost"
                                placeholder="Fill reduced cost"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.popup__content_renders}>
                    <p>Renders</p>
                    <div className={styles.popup__content_renders_wrapper}>
                        <div className={styles.popup__content_renders_content}>
                            <div className={styles.popup__content_renders_content_wrapper}>
                                {rendersContent}
                            </div>
                        </div>
                        <div className={styles.popup__content_renders_add}>
                            <input ref={rendersInputRef} onChange={handleFileChange} type="file" id="render" name="render" multiple accept="image/*" />
                            <button onClick={() => rendersInputRef.current?.click()} type="button">Add render</button>
                        </div>
                    </div>
                </div>
                <div className={styles.popup__content_views}>
                    <p>Additional views</p>
                    <div className={styles.popup__content_views_wrapper}>
                        <div className={styles.popup__content_views_content}>
                            <div className={styles.popup__content_views_content_wrapper}>
                                {viewsContent}
                            </div>
                        </div>
                        <div className={styles.popup__content_views_add}>
                            <button id={styles.button} onClick={() => setIsAddingView(true)} type="button">Add view</button>
                            <AdminViewAdding state={[isAddingView, setIsAddingView]} onSubmit={handleAddView} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProjectData;