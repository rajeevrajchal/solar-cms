import { Box, Center, Flex, Stack, Image, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Carousel } from "@mantine/carousel";

import banner from "@assets/background/background.svg";
import dashboard from "@assets/background/dashboard.svg";
import logo from "@assets/logo/png/logo_transparent.png";

const bannerSlider = [
  {
    label: "Eco Spark",
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Pariatur molestiae, vel nulla facilis esse
                        inventore officiis?`,
    banner: banner,
  },
  {
    label: "Easy to use Dashboard",
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Pariatur molestiae, vel nulla facilis esse
                        inventore officiis?`,
    banner: dashboard,
  },
];

const AuthLayout = () => {
  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
      }}
      bg="#6b63ff"
    >
      <Flex h="100%" direction={{ base: "column", sm: "row" }}>
        <Stack h="100%" w="100%" display={{ base: "none", sm: "block" }}>
          <Center
            h="100%"
            style={{
              flex: 1,
            }}
          >
            <Stack gap="xl">
              <Box w={140}>
                <Image src={logo} />
              </Box>
              <Carousel
                withControls={false}
                withIndicators
                height={600}
                w={500}
              >
                {bannerSlider.map((carousel: any, index: number) => (
                  <Carousel.Slide key={`carousel-${index}`}>
                    <Stack justify="center">
                      <Center>
                        <Image src={carousel?.banner || banner} />
                      </Center>
                      <Stack>
                        <Text
                          fw="bold"
                          ta="center"
                          c="white"
                          style={{
                            fontSize: "2rem",
                          }}
                        >
                          {carousel.label}
                        </Text>
                        <Text fs="xl" ta="center" c="white">
                          {carousel.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Stack>
          </Center>
        </Stack>

        <Box h="100%" bg="white" w="100%">
          <Stack justify="center" h="100%">
            <Center>
              <Stack
                w={{ base: "100%", sm: "60%" }}
                px={{ base: "lg", sm: 0 }}
                gap="md"
              >
                <Center>
                  <Box display={{ base: "block", sm: "none" }} w="60%">
                    <Image src={logo} />
                  </Box>
                </Center>
                <Outlet />
              </Stack>
            </Center>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthLayout;
