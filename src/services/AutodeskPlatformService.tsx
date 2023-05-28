"use client"
import { useState, useCallback, useMemo, useEffect } from 'react';

import { useHttpAps } from '@/hooks/useHttpAps';

interface IStubStyleProps {
    position: 'absolute';
    zIndex: string;
    top: string;
    left: string;
    transform: string;
};

export const useAutodeskPlatformService = () => {
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [isStubbed, setIsStubbed] = useState(false);

    const { getToken } = useHttpAps();

    const Autodesk = window.Autodesk;
    const THREE = window.THREE;
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js';
    //     script.async = true;
    //     document.body.appendChild(script);
    //     onload = ()
    
    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);
    
    const colorCompleted = new THREE.Vector4( 0, 255, 0, 0.5 );
    const colorInProgress = new THREE.Vector4( 0, 0, 255, 0.5 );
    const colorRejected = new THREE.Vector4( 255, 0, 0, 0.3 );

    let viewer: any;

    const stubStyle: IStubStyleProps = {
        position: 'absolute', 
        zIndex: '100', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
    };

    const renderViewer = async (modelUrn: string, viewerContainer: React.RefObject<HTMLElement>, toolbar: boolean = true, documentBrowser: boolean = false, isGhosting: boolean = true) => {
        setIsModelLoaded(false);

        const accessToken = await getToken();

        const options = {
            env: 'AutodeskProduction', 
            api: 'derivativeV2',
            locale: 'en-US',
            language: 'en',
            accessToken: accessToken,
        };

        async function initViewer() {
            setIsStubbed(true);
            
            Autodesk.Viewing.Initializer(options, async () => {
                const config = {
                    extensions: documentBrowser ? ['Autodesk.DocumentBrowser'] : []
                };
                
                if (viewerContainer.current) {
                    viewer = await new Autodesk.Viewing.GuiViewer3D(viewerContainer.current, config);
                }
                
                const setPreset = () => {
                    viewer.setLightPreset(7);
                };

                viewer.addEventListener(Autodesk.Viewing.VIEWER_INITIALIZED, setPreset);

                let startedCode = viewer.start();
                 
                if (startedCode > 0) {
                    console.error('Failed to create a Viewer: WebGL not supported.');
                    return;
                }  
                
                viewer.setTheme("light-theme");

                return viewer.removeEventListener(Autodesk.Viewing.VIEWER_INITIALIZED, setPreset);
            });
        }

        async function loadDocument() {
            Autodesk.Viewing.Document.load(
                `urn:${modelUrn}`,
                async (doc) => {
                    const defaultModel = doc.getRoot().getDefaultGeometry();
                    
                    await viewer.loadDocumentNode(doc, defaultModel);

                    viewer.toolbar.setVisible(toolbar);

                    viewer.setGhosting(isGhosting);

                    setIsStubbed(false);

                    viewer.waitForLoadDone()
                        .then(() => setIsModelLoaded(true))
                        .catch((err: string) => console.log(err))
                },
                (error) => {
                    console.error(error);
                },
                { accessToken }
            );  
        }

        initViewer();
        loadDocument();
    };

    const stub = (): JSX.Element | false => {
        return isStubbed && <div style={stubStyle}>Loading...</div>;
    };
    
    const isolateElements = useCallback(async (elements: string[], status: string, isGhosting: boolean = true) => {   
        let color: any;

        const getForgeIds = async () => {
            const forgeIdsArray: number[] = [];

            for (let i = 0; i < elements.length; i++) {
                const forgeId: string = await new Promise(resolve => {
                    viewer.search(elements[i], 
                        (dbIds: string) => {
                            resolve(dbIds);
                        }, 
                        () => {}, 
                        ['id']
                    )
                })
            
                forgeIdsArray.push(Number(forgeId[0]));
            }

            return forgeIdsArray;
        };

        const forgeIdsArray = await getForgeIds();    

        viewer.setGhosting(isGhosting);
        await viewer.isolate(forgeIdsArray);
        
        switch (status) {
            case 'completed':
                color = colorCompleted;
                break;
            case 'rejected':
                color = colorRejected
                break;
            case 'progress':
                color = colorInProgress
                break;
            default: 
                break;
        }

        forgeIdsArray.forEach((item: number) => {
            viewer.setThemingColor(item, color);
        })

        viewer.fitToView();
    }, []);

    const paintEverything = useCallback(async (elements: string[], status: string) => {  
        let color: any;

        const getForgeIds = async () => {
            const forgeIdsArray: number[] = [];

            for (let i = 0; i < elements.length; i++) {
                const forgeId: string = await new Promise(resolve => {
                    viewer.search(elements[i], 
                        (dbIds: string) => {
                            resolve(dbIds);
                        }, 
                        () => {}, 
                        ['id']
                    )
                })
            
                forgeIdsArray.push(Number(forgeId[0]));
            }

            return forgeIdsArray;
        };

        const forgeIdsArray = await getForgeIds();    

        switch (status) {
            case 'completed':
                color = colorCompleted;
                break;
            case 'rejected':
                color = colorRejected
                break;
            case 'progress':
                color = colorInProgress
                break;
            default: 
                break;
        }

        forgeIdsArray.forEach(item => {
            viewer.setThemingColor(item, color);
        })
    }, [])

    const resetIsolation = useCallback(() => {       
        // viewer.isolate();
        // viewer.clearThemingColors();
        viewer.fitToView();
    }, []);

    const isolateOnly = useCallback(async (elements: string[]) => {
        const getForgeIds = async () => {
            const forgeIdsArray: number[] = [];

            for (let i = 0; i < elements.length; i++) {
                const forgeId: string = await new Promise(resolve => {
                    viewer.search(elements[i], 
                        (dbIds: string) => {
                            resolve(dbIds);
                        }, 
                        () => {}, 
                        ['id']
                    )
                })
            
                forgeIdsArray.push(Number(forgeId[0]));
            }

            return forgeIdsArray;
        };

        const forgeIdsArray = await getForgeIds();
        
        viewer.setGhosting(true);
        viewer.isolate(forgeIdsArray);
    }, []);

    const setStatus = useCallback(async () => {
        const data = [
            {elements: ['409464'], status: 'completed'},
            {elements: ['210852', '210764', '210949'], status: 'rejected'},
            {elements: ['220087', '210651', '212027'], status: 'progress'}
        ];

        const elements: string[] = [];

        data.forEach(item => {
            elements.push(...item.elements);
        });

        data.forEach((item) => {
            paintEverything(item.elements, item.status)
        });

        await isolateOnly(elements);

        viewer.fitToView();
    }, [])

    const resetToolbarVisibility = useCallback(() => {
        viewer.toolbar.setVisible(false);
    }, []);

    const getProperties = useCallback(async() => {
        const selectedElement = viewer.getSelection()[0];
        viewer.getProperties(selectedElement, function(result: string) {
            console.log(result);
        });
    }, [])

    return {
        isModelLoaded, 
        renderViewer,
        stub,
        isolateElements, 
        resetIsolation, 
        resetToolbarVisibility,
        setStatus,
        getProperties
    };
}