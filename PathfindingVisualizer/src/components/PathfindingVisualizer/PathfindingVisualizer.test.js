import {rNDOM} from './PathfindingVisualizer'
import { tsExternalModuleReference } from '@babel/types';

const treu = jest.fn(() => 4);

test('to be treu', () => {expect(treu()).toBe(4);});