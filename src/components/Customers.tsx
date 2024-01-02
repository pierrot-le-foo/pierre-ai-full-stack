import Stack from "@mui/material/Stack";
import customers from "@/customers.json";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Customers() {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Stack pt={matches ? 2 : 1}>
      <Typography variant={matches ? "h4" : "h5"}>Customers</Typography>

      <Stack sx={{ overflowX: "scroll" }}>
        <Stack direction="row">
          {customers.map((customer) => {
            return (
              <Stack key={customer.name} p={4}>
                <Stack spacing={matches ? 9 : 7}>
                  <Avatar
                    src={customer.image}
                    alt={customer.name}
                    sx={{
                      boxShadow: "0 40px 25px 5px rgba(0, 0, 0, 0.3)",
                      width: matches ? 80 : 60,
                      height: matches ? 80 : 60,
                    }}
                  />

                  <Typography align="center">{customer.name}</Typography>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}
