// @ts-expect-error package is untyped
import * as serializer from "jest-serializer-html";
import { expect } from "vitest";

expect.addSnapshotSerializer(serializer);
