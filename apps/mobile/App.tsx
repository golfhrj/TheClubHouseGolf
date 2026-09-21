import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { theme } from "./src/theme";

const pillars = [
  {
    label: "01",
    title: "Unified catalogue",
    body: "Ten partner brands, one storefront.",
  },
  {
    label: "02",
    title: "Direct checkout",
    body: "Stripe on device. Cards, Apple Pay, wallet.",
  },
  {
    label: "03",
    title: "Partnerships",
    body: "Trainers, courses, and the YouTube library.",
  },
];

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>Clubhouse Golf</Text>
        <Text style={styles.h1}>
          Modern golf.{"\n"}Made simple.
        </Text>
        <Text style={styles.body}>
          Equipment, apparel, training and courses, from ten partner brands,
          in one storefront and one app.
        </Text>

        <Pressable style={styles.cta}>
          <Text style={styles.ctaText}>Shop the catalogue</Text>
        </Pressable>

        <View style={styles.pillarList}>
          {pillars.map((p) => (
            <View key={p.title} style={styles.pillarCard}>
              <Text style={styles.pillarLabel}>{p.label}</Text>
              <Text style={styles.pillarTitle}>{p.title}</Text>
              <Text style={styles.pillarBody}>{p.body}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.color.black,
  },
  content: {
    paddingHorizontal: theme.space[6],
    paddingTop: theme.space[24],
    paddingBottom: theme.space[16],
  },
  eyebrow: {
    color: theme.color.accent,
    fontSize: theme.type.eyebrow.size,
    letterSpacing: theme.type.eyebrow.tracking,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  h1: {
    color: theme.color.white,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "600",
    letterSpacing: -1,
    marginTop: theme.space[4],
  },
  body: {
    color: theme.color.muted,
    fontSize: theme.type.bodyLg.size,
    lineHeight: theme.type.bodyLg.lineHeight,
    marginTop: theme.space[5],
    maxWidth: 480,
  },
  cta: {
    backgroundColor: theme.color.accent,
    borderRadius: theme.radius.md,
    paddingVertical: theme.space[3],
    paddingHorizontal: theme.space[6],
    alignSelf: "flex-start",
    marginTop: theme.space[8],
  },
  ctaText: {
    color: theme.color.black,
    fontSize: theme.type.body.size,
    fontWeight: "600",
  },
  pillarList: {
    marginTop: theme.space[16],
    gap: theme.space[4],
  },
  pillarCard: {
    backgroundColor: theme.color.surface,
    borderColor: theme.color.borderSubtle,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.space[5],
  },
  pillarLabel: {
    color: theme.color.mutedDark,
    fontSize: theme.type.caption.size,
  },
  pillarTitle: {
    color: theme.color.white,
    fontSize: theme.type.h3.size,
    fontWeight: "600",
    marginTop: theme.space[2],
  },
  pillarBody: {
    color: theme.color.muted,
    fontSize: theme.type.body.size,
    lineHeight: theme.type.body.lineHeight,
    marginTop: theme.space[1],
  },
});
