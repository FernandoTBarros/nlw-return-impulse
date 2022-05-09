import BottomSheet from '@gorhom/bottom-sheet';
import { ChatTeardropDots } from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Options } from '../Options';
import { Success } from '../Success';
import { styles } from './styles';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
	const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
	const [feedbackSent, setFeedbackSent] = useState(false);

	const bottomSheetRef = useRef<BottomSheet>(null);

	function handleOpen() {
		bottomSheetRef.current?.expand();
	}
	function handleFeedbackReset() {
		setFeedbackType(null);
		setFeedbackSent(false);
	}
	return (
		<>
			<TouchableOpacity
				style={styles.button}
				onPress={handleOpen}
			>
				<ChatTeardropDots
					size={24}
					color={theme.colors.text_on_brand_color} />
			</TouchableOpacity>

			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={[1, 280]}
				backgroundStyle={styles.modal}
				handleIndicatorStyle={styles.indicator}
			>
				{
					feedbackSent ?
						<Success onFeedbackReset={handleFeedbackReset}/> :
						<>{
							feedbackType ?
								<Form
									feedbackType={feedbackType} 
									onFeedbackReset={handleFeedbackReset}
									onFeedbackSent={() => setFeedbackSent(true)}/>
								:
								<Options onFeedbackTypeChanged={setFeedbackType}/>
						}
						</>
				}
			</BottomSheet>
		</>
	);
}

export default gestureHandlerRootHOC(Widget) as React.FC;