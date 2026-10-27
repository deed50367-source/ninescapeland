import { expect, test } from 'bun:test';
import { eventTitle } from './rules';
test('new inquiry has a distinct notification event', () => { expect(eventTitle('new_inquiry')).toBeDefined(); });
test('saved chat contact details have a distinct notification event', () => { expect(eventTitle('lead_captured')).toBeDefined(); });
test('human request and actual takeover are both eligible events', () => {
  expect(eventTitle('handoff_requested')).toBeDefined();
  expect(eventTitle('human_joined')).toBeDefined();
  expect(eventTitle('unknown')).toBeUndefined();
});