import { expect, test } from 'bun:test';
import { shouldNotify } from './rules';

test('every visitor message triggers immediately, without a lead or handoff condition', () => {
  expect(shouldNotify({ role: 'user', is_staff_reply: false })).toBe(true);
  expect(shouldNotify({ role: 'user', is_staff_reply: null })).toBe(true);
});
test('AI and staff replies do not trigger visitor notifications', () => {
  expect(shouldNotify({ role: 'assistant', is_staff_reply: false })).toBe(false);
  expect(shouldNotify({ role: 'assistant', is_staff_reply: true })).toBe(false);
});