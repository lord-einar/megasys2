const passport = require("passport");
const { OIDCStrategy } = require("passport-azure-ad");

const users = {}; // Objeto para almacenar los usuarios en memoria

passport.use(
  "azure_ad",
  new OIDCStrategy(
    {
      identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
      clientID: process.env.AZURE_CLIENT_ID,
      responseType: "code id_token",
      responseMode: "form_post",
      redirectUrl: "http://localhost:9090/auth/openid/return",
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      validateIssuer: false,
      passReqToCallback: true,
      scope: ["profile", "offline_access", "email"],
      allowHttpForRedirectUrl: true,
      useCookieInsteadOfSession: false,
      store: true,
    },
    (
      req,
      iss,
      sub,
      profile,
      jwtClaims,
      accessToken,
      refreshToken,
      params,
      done
    ) => {
      if (!profile.oid) return done(new Error("No OID found"), null);

      // Adjuntar los grupos al perfil del usuario
      profile.groups = jwtClaims.groups || [];
      // Almacenar el usuario en el objeto 'users'
      users[profile.oid] = profile;

      return done(null, profile);
    }
  )
);

// Serialización del usuario para la sesión
passport.serializeUser((user, done) => {
  console.log("Serializando usuario:", user);
  done(null, user.oid);
});

// Deserialización del usuario desde la sesión
passport.deserializeUser((oid, done) => {
  console.log("Deserializando usuario con OID:", oid);
  const user = users[oid];
  if (user) {
    done(null, user);
  } else {
    done(new Error("Usuario no encontrado"), null);
  }
});

module.exports = passport;
