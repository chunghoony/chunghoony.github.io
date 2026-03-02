source "https://rubygems.org"

# Monkey-patch for Ruby 4.x compatibility
[Object, String, Symbol, Array, Hash, Integer, Float].each do |klass|
  klass.class_eval do
    def tainted?; false; end
    def taint; self; end
    def untaint; self; end
  end
end

gem "csv"
gem "webrick"
gem "base64"
gem "logger"
gem "bigdecimal"
gem "mutex_m"
# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.5"
# To upgrade, run `bundle update github-pages`.
gem "github-pages", group: :jekyll_plugins
# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem 'jekyll-octicons'
  gem 'jekyll-seo-tag'
end

gem "jekyll-github-metadata"

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

gem "faraday", "< 3.0"

