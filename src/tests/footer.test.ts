import {describe,it,expect} from 'vitest';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {LabFooterCredit} from '../components/LabFooterCredit';

describe('shared developer attribution',()=>{
 it('renders exact Thai attribution and educational disclaimer',()=>{
  const html=renderToStaticMarkup(React.createElement(LabFooterCredit));
  expect(html).toContain('พัฒนาโดย คุณครูสุพักตร์ศิริ พืชสิงห์ โรงเรียนโพธิ์ศรีสว่างวิทยา');
  expect(html).toContain('แบบจำลองเพื่อการเรียนรู้ ไม่ใช่ผลทดลองจริง');
  expect(html).toContain('class="lab-footer"');
 });
});
