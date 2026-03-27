---
title: Codeforces Round 636 (Div. 3) 题解 (全部6题)
date: 2020-04-22 09:00:00
permalink: /pages/f1638b/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛链接](https://codeforces.com/contest/1343)

## A. Candies

嘤～

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf;
//#define int ll
signed main(){
    for(int T=read();T--;){
        int n=read();
        int ans=0;
        repeat(i,1,60)
            if(n%((1ll<<i)-1)==0)ans=n/((1ll<<i)-1);
        cout<<ans<<endl;
    }
    return 0;
}
```

## B. Balanced Array

嘤嘤～

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf;
//#define int ll
signed main(){
    for(int T=read();T--;){
        int n=read();
        if(n%4==2)cout<<"NO"<<endl;
        else{
            ll sum=0;
            cout<<"YES"<<endl;
            repeat(i,1,n/2+1)
                cout<<i*2<<' ',sum+=i*2;
            repeat(i,1,n/2)
                cout<<i*2-1<<' ',sum-=i*2-1;
            cout<<sum<<endl;
        }
    }
    return 0;
}
```

## C. Alternating Subsequence

略略略～

更：我又回来了，稍微把题解写详细一点（~~说的好像原来有题解一样~~）。

连续的正数或者连续的负数，显然这种区间只能取出一个数，因此我们要最大化 `alternating subsequence` 的长度，就得在每个连续正数区间、连续负数区间中都取一个出来。在这个前提下保证取出来的数是区间最大值就行了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf;
//#define int ll
int a[N];
#define sgn(x) ((x)>0?1:-1)
signed main(){
    for(int T=read();T--;){
        int n=read();
        repeat(i,0,n)a[i]=read();
        int flag=sgn(a[0]);
        int m=-inf;
        ll ans=0;
        repeat(i,0,n){
            if(sgn(a[i])==flag){
                m=max(m,a[i]);
            }
            else{
                flag=-flag;
                ans+=m;
                m=a[i];
            }
        }
        ans+=m;
        cout<<ans<<endl;
    }
    return 0;
}
```

## D. Constant Palindrome Sum

两个数 `a,b` 要改成 `s` 的代价是：

`cost_i[s]=\begin{cases}0&a+b=s\\1&a+b\not=s∧s∈[a+1,a+k]∪[b+1,b+k]\\2&otherwise\end{cases}`。

（更：显然 `a+b=s` 就不需要动它了，代价 `0`；如果 `s∈[a+1,a+k]`，那么让 `b` 变成 `s-a`，如果 `s∈[b+1,b+k]`，那么让 `a` 变成 `s-b`，此操作改变的是 `a,b` 中的一个因此代价是 `1`；其他情况一律代价 `2`。）

考虑把所有对称的两个数的代价加起来（即把所有 `cost_i` 加起来），可以得到下标为 `s` 的数组 `cost[s]`。

上述操作中直接维护数组 `cost[s]` 是不行的，由于我们每次修改都是区间加，并且离线操作，可以考虑用差分数组，如果区间 `[l,r]` 要加上 `d`，可以 `a[l]+=d,a[r+1]-=d`，最后求它的前缀和，还原成 `cost[s]`。

这样我们对 `s` 的所有情况的代价都求出来了，`min` 一下即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=400010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf;
//#define int ll
int a[N],s[N];
void add(int x,int y,int d){
    s[x]+=d;
    s[y+1]-=d;
}
signed main(){
    for(int T=read();T--;){
        int n=read(),k=read();
        fill(s,s+2*k+2,0);
        repeat(i,0,n)a[i]=read();
        repeat(i,0,n/2){
            int x=a[i],y=a[n-i-1];
            if(x>y)swap(x,y);
            add(0,x,2);
            add(x+1,x+y-1,1);
            add(x+y+1,y+k,1);
            add(y+k+1,k*2,2);
        }
        int ans=inf;
        repeat(i,1,k*2+1){
            s[i]+=s[i-1];
            ans=min(ans,s[i]);
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

## E. Weights Distributing

傻逼题，我被套路了，原来这么简单。

先求每个点到 `A,B,C` 最短路径（`bfs` 即可），然后对于每个点 `v`，假设走的路径是 `A→v→B→v→C` ，计算这样的最小花费并更新答案。

路径确定怎么算最小花费？由于 `v→B` 要走两次，所以 `len(v→B)` 个最小边权要赋给它们，剩下 `len(v→A)+len(v→C)` 个最小边权赋给路径上其他边（至于对 `price` 排序求前缀和，就不多说了）。

（更：如果路径 `A→v` 和 `v→C` 有重复边，就会出现一条边赋上两个边权的情况，其实并没有什么问题，因为这种情况一定不比最优解优秀。）

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf;
#define int ll
int dis1[N],dis2[N],dis3[N],price[N];
int n,m,s1,s2,s3;
vector<int> a[N];
queue<int> q;
void bfs(int s,int dis[]){
    q.push(s);
    fill(dis,dis+n+1,-1);
    dis[s]=0;
    while(!q.empty()){
        int x=q.front(); q.pop();
        for(auto p:a[x])
        if(dis[p]==-1){
            dis[p]=dis[x]+1;
            q.push(p);
        }
    }
}
ll ans;
signed main(){
    for(int T=read();T--;){
        n=read();
        repeat(i,0,n+1)a[i].clear();
        m=read(),s1=read(),s2=read(),s3=read();
        repeat(i,1,m+1)price[i]=read();
        sort(price+1,price+m+1);
        repeat(i,1,m+1)price[i]+=price[i-1];
        repeat(i,0,m){
            int x=read(),y=read();
            a[x].push_back(y);
            a[y].push_back(x);
        }
        bfs(s1,dis1);
        bfs(s2,dis2);
        bfs(s3,dis3);
        ans=INF;
        repeat(i,1,n+1){
            int t2=dis2[i];
            int t1=dis1[i]+dis3[i];
            if(t2+t1<=m)
                ans=min(ans,price[t2]+price[t2+t1]);
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

## F. Restore the Permutation by Sorted Segments

这题不容易啊，我今天从凌晨一点写到凌晨两点多，后来代码全部扔了重写，又写了近半个下午。

而且我觉得我的解法很不自然，最好还是去看官方题解吧，我相对于官方题解的唯一优势可能就是复杂度少了个 `log` 吧。

有个简单的性质，就是最多两个数只出现一次，因为不是首尾的数字一定被两个区间包含。

我们可以假设某个出现了一次的数字是最右边的那个数字，把这个数字记录到答案的末尾，然后从集合中去掉这个 `segment`，因为这个操作会导致出现了新的（出现了一次的数字），因此不断重复此操作可以拟合出答案。

比如样例中的：

`[2,5,6][4,6][1,3,4][1,3][1,2,4,6]`。

显然 `5` 是唯一出现一次的数字，删除第一个 `segment`。

`[4,6][1,3,4][1,3][1,2,4,6]`。

我们查看刚删除的 `segment` 里的 `2,5,6` 三个数字（我们要找新的（出现一次的数字），不是原来就是（出现一次的数字）），发现 `2` 出现一次，删除最后一个 `segment`。

`[4,6][1,3,4][1,3]`。

我们查看 `1,2,4,6`，`6` 满足，删之。

`[1,3,4][1,3]`。

`4` 没得选。

`[1,3]`。

这时候把 `1,3` 都选了。但是先选哪个是个问题，所以两种情况都待选。

当然，因为最开始的时候出现一次的数字可能有两个，因此都要试一下，全部进入待选。

这样，我们会有至多 `4` 个待选（我的写法会有至多 `8` 个，不管了），测试一下即可（为什么不能一次性得到答案呢？因为我 `wa` 了半天，隐约觉得好像哪里有锅，后来加了待选机制才过，所以这个解法不太自然/kk）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=210; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
int n,m;
bool a[N][N];
vector<int> p[N];
int c[N];
vector<int> rec;
vector<vector<int>> ans;
void remove(int x,int y){
    a[x][y]=0;
    c[y]--;
}
void resume(int x,int y){
    a[x][y]=1;
    c[y]++;
}
void work(int x,int y,int dep){
    if(!a[x][y])return;
    if(c[y]!=1)return;
    if(dep==n){
        if(p[x].size()!=2)return;
        rec.push_back(p[x][0]);
        rec.push_back(p[x][1]);
        ans.push_back(rec);
        rec.pop_back();
        rec.pop_back();
        rec.push_back(p[x][1]);
        rec.push_back(p[x][0]);
        ans.push_back(rec);
        rec.pop_back();
        rec.pop_back();
        return;
    }
    rec.push_back(y);
    for(auto j:p[x])
        remove(x,j);
    for(auto j:p[x])
    repeat(i,0,n){
        work(i,j,dep+1);
    }
    for(auto j:p[x])
        resume(x,j);
    rec.pop_back();
    return;
}
void output(vector<int> &ans){
    for(auto i:ans)
        cout<<i+1<<' ';
    cout<<endl;
}
bool ok(vector<int> &ans){
    reverse(ans.begin(),ans.end());
    static int pos[N];
    static vector<int> a;
    repeat(i,0,ans.size())
        pos[ans[i]]=i;
    repeat(x,0,n){
        a.clear();
        for(auto y:p[x]){
            a.push_back(pos[y]);
        }
        sort(a.begin(),a.end());
        repeat(i,0,a.size()-1)
        if(a[i]!=a[i+1]-1)
            return 0;
    }
    return 1;
}
void work0(){
    repeat(i,0,n)
    repeat(j,0,m)
        work(i,j,1);
    for(auto &i:ans)
    if(ok(i)){
        output(i);
        return;
    }
}
signed main(){
    for(int T=read();T--;){
        n=read()-1; m=n+1;
        repeat(i,0,m)
        repeat(j,0,m)
            a[i][j]=0;
        repeat(i,0,m)c[i]=0;
        repeat(i,0,m)p[i].clear();
        ans.clear();
        
        repeat(x,0,n){
            int t=read();
            while(t--){
                int y=read()-1;
                a[x][y]=1;
                c[y]++;
                p[x].push_back(y);
            }
        }
        work0();
    }
    return 0;
}
```
