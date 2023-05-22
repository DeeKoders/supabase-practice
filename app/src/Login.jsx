import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://mfbwdscikclnwzphjpzy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndkc2Npa2Nsbnd6cGhqcHp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NTk0MzAsImV4cCI6MjAwMDIzNTQzMH0.-xTsslnKV0Nwvl4ZMI0Ys5eZBR3VSeHGEoHBNSDD04U"
);

export default function Login() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  if (session) {
    navigate("/dashboard");
  }
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Row className=" w-100 justify-content-center">
        <Col md={6}>
          <Auth
            supabaseClient={supabase}
            providers={false}
            redirectTo="/dashboard"
            appearance={{ theme: ThemeSupa }}
          />
        </Col>
      </Row>
    </Container>
  );
}
