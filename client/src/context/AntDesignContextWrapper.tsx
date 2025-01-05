import { ConfigProvider } from "antd";
type AntDesignConfigProps = {
  children: React.ReactNode;
};
export function AntDesignConfig({ children }: AntDesignConfigProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#639780",
          colorText: "#EAF5F5",

          colorBgContainer: "#F5FFF7",
        },
        components: {},
      }}
    >
      {children}
    </ConfigProvider>
  );
}
