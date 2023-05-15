import { ReactNode, useState } from "react";
import CopyingMessage from "@/components/ui/copyingMessage/CopyingMessage";

export const useCopyLinkToClipboard = (): [ReactNode, (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void] => {
    const [isVisibleCopyingMessage, setIsVisibleCopyingMessage] = useState(false);
    const baseUrl = "https://aio.house";

    const copyLinkToClipboard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        let target = e.target as HTMLElement;
        if (target && target.tagName !== "svg") {
            target = target.parentElement as HTMLElement;
        }
        if (!target) {
            console.error("Could not find parent svg element");
            return;
        }
        const svg =
            target.tagName === "svg"
                ? target
                : (target.querySelector("svg") as SVGElement);
        const parentDiv = svg.parentNode as HTMLElement;
        const link = String(baseUrl + parentDiv.getAttribute("data-link")).replace(" ", "%20");
        navigator.clipboard
            .writeText(link)
            .then(() => {
                setIsVisibleCopyingMessage(true);
                setTimeout(() => setIsVisibleCopyingMessage(false), 2000);
            })
            .catch(error => {
                console.error("Failed to copy link: ", error);
            });
    };

    return [<CopyingMessage key="copying-message" isActive={isVisibleCopyingMessage} />, copyLinkToClipboard];
}