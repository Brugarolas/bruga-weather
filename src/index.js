import React from 'react';
import { render } from 'react-dom';
import '@/assets/styles/main.less';
import App from '@/ui/containers/app';

import { Provider } from "react-redux";
import store from "@/store/index.js";

const home = document.getElementById('home');

render(<Provider store={store}><App /></Provider>, home);
