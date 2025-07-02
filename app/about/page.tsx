import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Lightbulb, Globe, BookOpen, Code } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Lead Developer & Content Creator",
      bio: "Full-stack developer with 8+ years of experience in React, Node.js, and cloud technologies.",
      skills: ["React", "TypeScript", "AWS", "Python"],
    },
    {
      name: "Mike Chen",
      role: "UI/UX Designer & Frontend Developer",
      bio: "Passionate about creating beautiful, accessible user experiences and modern web design.",
      skills: ["Design", "CSS", "Figma", "Accessibility"],
    },
    {
      name: "Alex Rodriguez",
      role: "Technical Writer & SEO Specialist",
      bio: "Experienced technical writer who makes complex topics accessible to everyone.",
      skills: ["Technical Writing", "SEO", "Content Strategy", "Analytics"],
    },
  ]

  const values = [
    {
      icon: BookOpen,
      title: "Knowledge Sharing",
      description:
        "We believe in making technology knowledge accessible to everyone, regardless of their background or experience level.",
    },
    {
      icon: Code,
      title: "Practical Learning",
      description:
        "Our content focuses on real-world applications and hands-on examples that you can immediately apply.",
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "We're building a worldwide community of learners, sharing knowledge across cultures and languages.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We stay at the forefront of technology trends to bring you the latest insights and emerging technologies.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About TechKL</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            TechKL (Technology Knowledge & Learning) is your premier destination for technology insights, learning
            resources, and industry news. We're passionate about making technology accessible and helping people grow
            their skills in the ever-evolving digital world.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-3xl text-gray-900">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                To democratize technology education by providing high-quality, accessible content that empowers
                individuals to learn, grow, and succeed in the digital age. We bridge the gap between complex technical
                concepts and practical, real-world applications.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-green-600 mb-4" />
                <CardTitle>Educational Content</CardTitle>
                <CardDescription>
                  Comprehensive tutorials, guides, and articles covering programming, web development, cloud computing,
                  and emerging technologies.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-8 w-8 text-blue-600 mb-4" />
                <CardTitle>Industry News</CardTitle>
                <CardDescription>
                  Stay updated with the latest technology news, trends, and developments from around the world, curated
                  for relevance and accuracy.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-purple-600 mb-4" />
                <CardTitle>Community Support</CardTitle>
                <CardDescription>
                  Join a growing community of learners, share knowledge, ask questions, and collaborate on projects with
                  like-minded individuals.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <CardContent className="py-12">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
                  <div className="text-gray-300">Articles Published</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-400 mb-2">10K+</div>
                  <div className="text-gray-300">Monthly Readers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-400 mb-2">5+</div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                  <div className="text-gray-300">Learning Support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <Card className="bg-blue-600 text-white">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of learners who trust TechKL for their technology education
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/blog"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Explore Our Blog
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
