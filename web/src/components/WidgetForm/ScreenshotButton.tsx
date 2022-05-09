import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas'
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
	screenshot: string | null;
	onScreenshotTaken: (screenShot: string | null) => void;
}

export function ScreenshotButton({ screenshot, onScreenshotTaken }: ScreenshotButtonProps) {
	const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

	async function handleTakeScreenshot() {
		setIsTakingScreenshot(true);

		const canvas = await html2canvas(document.querySelector('html')!);
		const base64image = canvas.toDataURL('image/png');
		onScreenshotTaken(base64image);

		setIsTakingScreenshot(false);
	}
	if (screenshot) {
		return (
			<button
				type="button"
				className="p-1 h-10 w-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 "
				onClick={() => onScreenshotTaken(null)}
				style={{
					backgroundImage: `url(${screenshot})`,
					backgroundPosition: 'right bottom',
					backgroundSize: 180
				}}>
				<Trash weight="fill" />
			</button>
		)
	}
	return (
		<button
			type="button" disabled={isTakingScreenshot}
			onClick={handleTakeScreenshot}
			className="p-2 bg-zinc-800 disabled:cursor-progress rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
		>
			{isTakingScreenshot ? <Loading /> : <Camera className="h-6 w-6" />}
		</button>
	)
}