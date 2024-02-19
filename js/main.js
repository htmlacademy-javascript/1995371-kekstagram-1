import {createPhotoPosts} from './mockup-data.js';
import {renderThumbs} from './photo/thumb.js';
import './upload-form/upload-form.js';

renderThumbs(createPhotoPosts());
