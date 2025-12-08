import { Box } from "./components/rachanaUI/ui/Box";

import AvatarDemo from "./demos/AvtarDemo";
import BadgeDemo from "./demos/BadgeDemo";
import ButtonDemo from "./demos/ButtonDemo";
import DividerDemo from "./demos/DividerDemo";
import DraggableDemo from "./demos/DraggableDemo";
import OverlayDemo from "./demos/OverlayDemo";
import ResizableDemo from "./demos/ResizableDemo";
import SkeletonDemo from "./demos/SkeletonDemo";
import SortableDemo from "./demos/SortableDemo";
function App() {
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Inter, sans-serif",
        background: "#f7f7fb",
        minHeight: "100vh",

        /* ✅ vertical layout */
        display: "flex",
        flexDirection: "column",
        gap: 48,
      }}
    >
      <Box>
        <AvatarDemo />
      </Box>

      <Box>
        <BadgeDemo />
      </Box>

      <Box>
        <ButtonDemo />
      </Box>

      <Box>
        <DividerDemo />
      </Box>

      <Box>
        <DraggableDemo />
      </Box>

      <Box>
        <OverlayDemo />
      </Box>

      <Box>
        <ResizableDemo />
      </Box>

      <Box>
        <SkeletonDemo />
      </Box>
      <Box>
        <SortableDemo />
      </Box>
    </div>
  );
}

export default App;
