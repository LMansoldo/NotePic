import{ createContext, useContext } from 'react';

import type { AnnotationAction } from '@context/Annotations'
import type { AnnotationsState } from '@types'

import { initialState } from './initialState'

const AnnotationsContext = createContext<{
	state: AnnotationsState
	dispatch: React.Dispatch<AnnotationAction>
}>({ state: initialState, dispatch: () => null })

const useAnnotations = () => useContext(AnnotationsContext);

export { useAnnotations, AnnotationsContext }
