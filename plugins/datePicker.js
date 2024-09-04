// plugins/vue2-datepicker.js

import Vue from 'vue';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';  // Importing the default CSS styles for the DatePicker component.

// Register the DatePicker component globally so it can be used in any component without needing to import it again.
Vue.component('DatePicker', DatePicker);
