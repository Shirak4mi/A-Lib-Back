import CreateQueuePosition from "./methods/CreateQueuePosition.ts";
import DeleteQueuePosition from "./methods/DeleteQueuePosition.ts";
import UpdateQueuePosition from "./methods/UpdateQueuePosition.ts";
import FinishQueuePosition from "./methods/FinishQueuePosition.ts";
import GetQueuePositions from "./methods/GetQueuePositions.ts";

import { Elysia } from "elysia";

export default new Elysia({ prefix: "Queue", normalize: true, detail: { tags: ["Queue"] } })
  .use(GetQueuePositions)
  .use(CreateQueuePosition)
  .use(DeleteQueuePosition)
  .use(UpdateQueuePosition)
  .use(FinishQueuePosition);
