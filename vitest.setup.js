import { expect } from "vitest";
import * as matcher from '@testing-library/jest-dom/matchers'
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
console.log('setup file')
expect.extend(matcher)
afterEach(()=>{
    cleanup()
})