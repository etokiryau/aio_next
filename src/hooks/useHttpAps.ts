import { useCallback } from "react";

export const useHttpAps = () => {
    const clientId: string = 'tSWiGLZVyUbMm6phm8wDBkb3dxjNFkRv';
    const clientSecret: string = 'bCziZvYLmADMdmWd';
    const url: string = 'https://developer.api.autodesk.com/authentication/v1/authenticate';

    const getToken = useCallback(async (): Promise<string> => {
        try {
            const response: Response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials&scope=data:read data:write data:create bucket:read bucket:create`,
            })

            if (!response.ok) {
                throw new Error(`Could not fetch: ${url}, status: ${response.status}`)
            }

            const data: any = await response.json();
            const token: string = data.access_token;

            return token;
        } catch(e) {
            throw e;
        } 
    }, []);

    return { getToken };
}