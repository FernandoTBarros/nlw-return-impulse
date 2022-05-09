import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
	BUG: {
		title: 'Problema',
		image: {
			source: bugImageUrl,
			alt: 'Problema'
		}
	},
	IDEA: {
		title: 'Ideia',
		image: {
			source: ideaImageUrl,
			alt: 'Ideia'
		}
	},
	OTHER: {
		title: 'Outro',
		image: {
			source: thoughtImageUrl,
			alt: 'Problema'
		}
	}
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
	const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
	const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);


	function handleRestartFeedback() {
		setFeedbackSubmitted(false);
		setFeedbackType(null);
	}
	return (
		<div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

			{!feedbackSubmitted ? (
				!feedbackType ? (
					<FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
				) : (
					<FeedbackContentStep feedbackSubmitted={() => setFeedbackSubmitted(true)} restartFeedback={handleRestartFeedback} feedbackType={feedbackType} />
				)
			)
				: 
				<FeedbackSuccessStep restartFeedback={handleRestartFeedback}/>
			}
			<footer className="text-xs text-neutral-400">
				Feito com 🤍 pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
			</footer>
		</div>
	)
}